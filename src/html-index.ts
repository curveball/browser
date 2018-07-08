import { Context } from '@curveball/core';
import {
  Link,
  SureOptions,
} from './types';

import highlight from 'highlight.js';
import url from 'url';

export default function generateHtmlIndex(ctx: Context, body: any, options: SureOptions) {

  const jsonBody = syntaxHighlightJson(body);

  const links: Link[] = getLinksFromBody(body);
  const [nav, remainingLinks] = generateNavigation(links, options);
  const linksHtml = generateLinks(remainingLinks);

  const stylesheets = options.stylesheets.map(ss => {
    return `    <link rel="stylesheet" href="${h(url.resolve(options.assetBaseUrl, ss))}" type="text/css" />\n`;
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

    <nav>
      ${nav}
    </nav>

    <main>
      ${linksHtml}

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

function syntaxHighlightJson(body: any): string {

  return highlight.highlight('json', JSON.stringify(body, undefined, '  ')).value;

}

function generateLinks(links: Link[]): string {

  let linkHtml = '';

  // Grouping links by rel.
  const groups: { [rel: string]: Link[] } = {};

  for (const link of links) {
    if (groups[link.rel]) {
      groups[link.rel].push(link);
    } else {
      groups[link.rel] = [link];
    }
  }

  for (const group of Object.values(groups)) {

    const linkCount = group.length;
    let first = true;

    for (const link of group) {

      linkHtml += '<tr>';
      if (first) {
        linkHtml += `<td rowspan="${linkCount}">${h(link.rel)}</td>`;
        first = false;
      }
      linkHtml += `<td><a href="${h(link.href)}">${h(link.href)}</a></td>`;
      linkHtml += '<td>' + (link.title ? h(link.title) : '') + '</td>';
      linkHtml += '</tr>\n';

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

function generateNavigation(links: Link[], options: SureOptions): [string, Link[]] {

  const remainingLinks: Link[] = [];
  const html: string[] = [];

  for (const link of links) {

    if (!options.navigationLinks[link.rel]) {
      remainingLinks.push(link);
      continue;
    }
    const nl = options.navigationLinks[link.rel];

    const title = (
      link.title ? link.title :
      ( nl.defaultTitle )
    );

    const iconUrl = url.resolve(
      options.assetBaseUrl,
      nl.icon ? nl.icon : 'icon/' + link.rel + '.svg'
    );
    html.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(title) }">` +
      `<img src="${ iconUrl }" /></a>`
    );

  }

  if (!html.length) {
    return ['', remainingLinks];
  }

  const result = '    <ul>\n      <li>' + html.join('</li>\n      <li>') + '      </li>\n    </ul>\n';

  return [result, remainingLinks];

}

function getLinksFromBody(body: any): Link[] {

  if (!body._links) {
    return [];
  }

  const result: Link[] = [];

  for (const rel of Object.keys(body._links)) {

    let linksTmp;

    if (Array.isArray(body._links[rel])) {
      linksTmp = body._links[rel];
    } else {
      linksTmp = [body._links[rel]];
    }
    for (const link of linksTmp) {

      if (!link.href) {
        // tslint:disable:no-console
        console.warn('Incorrect format for HAL link with rel: ' + rel);
      }
      result.push({
        rel: rel,
        href: link.href,
        type: link.type,
        title: link.title,
      });

    }

  }
  return result;

}
