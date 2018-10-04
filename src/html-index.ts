import { Context } from '@curveball/core';
import { Link, SureOptions } from './types';

import url from 'url';
import alternate from './components/alternate';
import csvBody from './components/csv-body';
import embedded from './components/embedded';
import halBody from './components/hal-body';
import linksTable from './components/links-table';
import markdownBody from './components/markdown-body';
import navigation from './components/navigation';
import pager from './components/pager';
import search from './components/search';
import { fetchLinks, h } from './util';

export default async function generateHtmlIndex(ctx: Context, options: SureOptions) {

  checkFormat(ctx);
  const body = ctx.response.body;

  const links: Link[] = fetchLinks(ctx, options);
  const navHtml = navigation(links, options);
  const alternateHtml = alternate(links, options);
  const pagerHtml = pager(links, options);
  const linksHtml = linksTable(links, options);
  const [headTitle, bodyTitle] = generateTitle(links, ctx, options);
  const embeddedHtml = embedded(body, options);
  const bodyHtml = await parseBody(ctx);
  const searchHtml = search(links, options);

  const stylesheets = options.stylesheets.map(ss => {
    return `    <link rel="stylesheet" href="${h(url.resolve(options.assetBaseUrl, ss))}" type="text/css" />\n`;
  }).join('');

  ctx.response.type = 'text/html; charset=utf-8';
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
      ${alternateHtml}
    </nav>

    <main>
      ${linksHtml}
      ${bodyHtml}
      ${embeddedHtml}
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
    href = ctx.path;
  }

  const body = ctx.response.body;

  if (body && typeof body === 'object') {
    if (!title && body.title) {
      title = body.title;
    }
    if (!title && body.name) {
      title = body.name;
    }
  }
  if (!title) {
    title = href;
  }

  return [
    `${h(title)} - ${options.title}`,
    `<a href="${h(href)}" rel="self">${h(title)}</a> - ${options.title}`
  ];

}

async function parseBody(ctx: Context): Promise<string> {

  if (!ctx.response.body) {
    // Ignore empty bodies
    return '';
  }

  switch (ctx.response.type) {

    case 'application/json' :
    case 'application/problem+json' :
    case 'application/hal+json' :
      return halBody(ctx);

    case 'text/markdown' :
      return markdownBody(ctx);

    case 'text/csv' :
      return csvBody(ctx);

    default:
      return '';

  }

}

function checkFormat(ctx: Context) {

  if ((typeof ctx.response.body === 'string' || ctx.response.body instanceof Buffer) &&
    ctx.response.is('json')
  ) {
    if (ctx.response.body instanceof Buffer) {
      ctx.response.body = JSON.parse(ctx.response.body.toString('utf-8'));
    } else {
      ctx.response.body = JSON.parse(ctx.response.body);
    }
  }

}
