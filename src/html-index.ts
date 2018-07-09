import { Context } from '@curveball/core';
import {
  Link,
  NavigationLink,
  SureOptions,
} from './types';

import highlight from 'highlight.js';
import querystring from 'querystring';
import url from 'url';

export default function generateHtmlIndex(ctx: Context, body: any, options: SureOptions) {

  const links: Link[] = fetchLinks(body, options);
  const navHtml = generateNavigation(links, options);
  const pagerHtml = generatePager(links, options);
  const linksHtml = generateLinks(links, options);
  const [headTitle, bodyTitle] = generateTitle(links, ctx, options);
  const bodyHtml = generateBody(body);
  const searchHtml = generateSearch(links, options);

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
      ${searchHtml}
    </header>

    <nav>
      ${navHtml}
    </nav>

    <main>
      ${linksHtml}

      <h2>Contents</h2>
      <code class="hljs"><pre>${bodyHtml}</pre></code>

      ${pagerHtml}

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

/**
 * Returns the list of links for a section.
 *
 * This function sorts and normalizes the link.
 */
function getNavLinks(links: Link[], options: SureOptions, position: 'header' | 'pager'): Array<Link & NavigationLink> {

  const result = [];
  for (const link of links) {

    // Don't handle templated links.
    if (link.templated) {
      continue;
    }
    if (options.navigationLinks[link.rel] === undefined) {
      continue;
    }
    const nl = options.navigationLinks[link.rel];

    if (
      (typeof nl.position === 'undefined' && position !== 'header') ||
      (typeof nl.position !== 'undefined' && nl.position !== position)
    ) {
      continue;
    }

    result.push({
      rel: link.rel,
      href: link.href,
      title: link.title ? link.title : ( nl.defaultTitle ? nl.defaultTitle : link.rel ),
      icon: url.resolve(options.assetBaseUrl, nl.icon ? nl.icon : 'icon/' + link.rel + '.svg'),
      priority: nl.priority ? nl.priority : 0,
      showLabel: nl.showLabel,
    });

  }

  return result.sort( (a, b) => a.priority - b.priority);

}

function generateNavigation(links: Link[], options: SureOptions): string {

  const html: string[] = [];

  for (const link of getNavLinks(links, options, 'header')) {

    html.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(link.title) }">` +
      `<img src="${ link.icon }" />${ link.showLabel ? ' ' + h(link.title) : ''}</a>`
    );

  }

  if (!html.length) {
    return '';
  }

  const result = '    <ul>\n      <li>' + html.join('</li>\n      <li>') + '      </li>\n    </ul>\n';

  return result;

}

function generatePager(links: Link[], options: SureOptions): string {

  const html: string[] = [];

  for (const link of getNavLinks(links, options, 'pager')) {

    html.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(link.title) }">` +
      `<img src="${h(link.icon)}" /> ${h(link.title)}</a>`
    );

  }

  if (!html.length) {
    return '';
  }

  const result = '  <nav class="pager">\n    <ul>\n      <li>' + html.join('</li>\n      <li>') + '      </li>\n    </ul>\n  </nav>\n';
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

function generateSearch(links: Link[], options: SureOptions): string {

  const searchRel = links.find( link => link.rel === 'search');
  if (searchRel === undefined) {
    return '';
  }
  if (!searchRel.templated) {
    return '';
  }

  // We only support a very specific format. The link must be
  // templated, have at most 1 templated field, and that field must
  // appear in the query parameter.
  //
  // Sample format:
  // {
  //   href: "/search?language=nl{?q}",
  //   templated: true
  // }
  //
  // This regex might capture invalid templates, but it's not up to us to
  // validate it.
  const matches = searchRel.href.match(/^([^{]+){\?([a-zA-z0-9]+)}([^{]*)$/);
  if (matches === null) {
    return '';
  }

  // Url with the template variable stripped.
  const newUrl = matches[1] + matches[3];

  const [action, queryStr] = newUrl.split('?');
  const query = querystring.parse(queryStr);

  let html = `<form method="GET" action="${h(action)}" class="search">`;
  html += '<img src="' + url.resolve(options.assetBaseUrl, 'icon/search.svg') + '" />';
  for (const pair of Object.entries(query)) {
    html += `<input type="hidden" name="${h(pair[0])}" value="${h(<string> pair[1])}" />`;
  }

  html += `<input type="search" placeholder="Search" name="${h(matches[2])}" />`;
  html += '</form>';

  return html;

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
        templated: link.templated,
      });

    }

  }

  return result;

}
