import { Context, Middleware } from '@curveball/core';
import highlight from 'highlight.js';

/**
 * Options that may be passed to the middleware.
 */
type Options = {
  title?: string
  stylesheets?: string[]
}

/**
 * Options after clean-up.
 *
 * Basically the same but nothing is optional.
 */
type SureOptions = {
  title: string,
  stylesheets: string[]
}

const parsedContentTypes = [
  'application/json',
  'application/hal+json',
  'application/problem+json',
];


export default function browser(options?: Options): Middleware {

  if (typeof options === 'undefined') {
    options = {};
  }

  if (!options.title) {
    options.title = 'HAL Browser';
  }

  if (!options.stylesheets) {
    options.stylesheets = [];
  }

  return async (ctx: Context, next: Function) => {

    // Check to see if the client even wants html.
    if (!ctx.request.accepts('text/html')) {
      return next();
    }

    // Doing the inner request
    await next();

    // We only care about transforming a few content-types
    if (!parsedContentTypes.includes(ctx.response.type)) {
      return;
    }

    // Find out the client prefers HTML over the content-type that was actually
    // returned.
    //
    // This is useful if the client submitted a lower q= score for text/html
    if (ctx.request.accepts('text/html', ...parsedContentTypes) === 'text/html') {
      ctx.response.headers.set('Content-Type', 'text/html');
      generateHtmlIndex(ctx, ctx.response.body, <SureOptions>options);
    }

  }

}

function generateHtmlIndex(ctx: Context, body: Object, options: SureOptions) {

  const jsonBody = syntaxHighlightJson(body);
  const links = generateLinks(body);

  const stylesheets = options.stylesheets.map(ss => {
    return `    <link rel="stylesheet" href="${h(ss)}" type="text/css" />\n`
  }).join('');

  ctx.response.body = `
<!DOCTYPE html>
<html>
  <head>
    <title>${h(options.title)}</title>
${stylesheets}
  </head>
  <body>
    <header>
      <h1>${h(options.title)}</h1>
    </header>

    <main>
      ${links}

      <h2>Body</h2>
      <code class="hljs"><pre>${jsonBody}</pre></code>

    </main>

  </body>
</html>
`;

}

function h(input: string): string {

  const map: { [s: string]: string } = {
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;',
    '"' : '&quot'
  };

  return input.replace(/&<>"/g, s => map[s]);

}

function syntaxHighlightJson(body: Object): string {

  return highlight.highlight('json', JSON.stringify(body, undefined, '  ')).value;

}

function generateLinks(body: any): string {

  if (!body._links) return '';

  let linkHtml = '';

  for (const rel in body._links) {

    const links =
      Array.isArray(body._links[rel]) ?
      body._links[rel] :
      [body._links[rel]];

    const linkCount = links.length;
    let first = true;

    for (const link of links) {

      linkHtml += `<tr>`;
      if (first) {
        linkHtml += `<td rowspan="${linkCount}">${h(rel)}</td>`;
        first = false;
      }
      linkHtml += `<td><a href="${h(link.href)}">${h(link.href)}</a></td>`;
      linkHtml += `<td>` + (link.title ? h(link.title) : '') + `</td>`;
      linkHtml += `</tr>\n`;

    }


  }

  return `
    <h2>Links</h2>
    <table>
      <tr>
        <th>Relationship</th><th>Url</th><th>Title</th>
      </tr>
      ${linkHtml}
    </table>
  `;

}

