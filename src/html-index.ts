import { Context } from '@curveball/core';
import {
  Link,
  SureOptions,
} from './types';

import highlight from 'highlight.js';
import url from 'url';

export default function generateHtmlIndex(ctx: Context, body: any, options: SureOptions) {

  const links: Link[] = fetchLinks(body, options);
  const nav = generateNavigation(links, options);
  const linksHtml = generateLinks(links, options);
  const [headTitle, bodyTitle] = generateTitle(links, ctx, options);
  const bodyHtml = generateBody(body);

  const stylesheets = options.stylesheets.map(ss => {
    return `    <link rel="stylesheet" href="${h(url.resolve(options.assetBaseUrl, ss))}" type="text/css" />\n`;
  }).join('');


  ctx.response.body = `
<!DOCTYPE html>
<html>
  <head>
    <title>${headTitle}</title>
${stylesheets}
  </head>
  <body>
    <header>
      <h1>${bodyTitle}</h1>
    </header>

    <nav>
      ${nav}
    </nav>

    <main>
      ${linksHtml}

      <h2>Contents</h2>
      <code class="hljs"><pre>${bodyHtml}</pre></code>

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

function generateBody(body: any) {

  const tmpBody = Object.assign(body);
  delete tmpBody._links;

  return syntaxHighlightJson(tmpBody);

}


function generateLinks(links: Link[], options: SureOptions): string {

  let linkHtml = '';

  // Grouping links by rel.
  const groups: { [rel: string]: Link[] } = {};

  for (const link of links) {

    if (options.hiddenRels.includes(link.rel) || link.rel in options.navigationLinks) {
      continue;
    }

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

  if (!linkHtml) {
    // No links
    return '';
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

function generateNavigation(links: Link[], options: SureOptions): string {

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
    return '';
  }

  const result = '    <ul>\n      <li>' + html.join('</li>\n      <li>') + '      </li>\n    </ul>\n';

  return result;

}

function generateTitle(links: Link[], ctx: Context, options: SureOptions): [string, string] {

  const selfLink = links.find( link => link.rel === 'self' );

  let title;
  let href;

  if (selfLink) {
    title = selfLink.title;
    href = selfLink.href;
  } else {
    href = ctx.request.path;
  }

  if (!title && ctx.response.body.title) {
    title = ctx.response.body.title;
  }
  if (!title && ctx.response.body.name) {
    title = ctx.response.body.name;
  }
  if (!title) {
    title = href;
  }

  return [
    `${h(title)} - ${options.title}`,
    `<a href="${h(href)}" rel="self">${h(title)}</a> - ${options.title}`
  ];

}

function fetchLinks(body: any, options: SureOptions): Link[] {

  const result: Link[] = Array.from(options.defaultLinks);

  if (!body._links) {
    return result;
  }

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
