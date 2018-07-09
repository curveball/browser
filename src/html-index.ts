import { Context } from '@curveball/core';
import { Link, SureOptions } from './types';

import url from 'url';
import halBody from './components/hal-body';
import linksTable from './components/links-table';
import navigation from './components/navigation';
import pager from './components/pager';
import search from './components/search';
import { fetchLinks, h } from './util';

export default function generateHtmlIndex(ctx: Context, body: any, options: SureOptions) {

  const links: Link[] = fetchLinks(body, options);
  const navHtml = navigation(links, options);
  const pagerHtml = pager(links, options);
  const linksHtml = linksTable(links, options);
  const [headTitle, bodyTitle] = generateTitle(links, ctx, options);
  const bodyHtml = halBody(body);
  const searchHtml = search(links, options);

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
