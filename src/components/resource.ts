import { Context } from '@curveball/core';
import { Link, SureOptions } from '../types';
import csvBody from './csv-body';
import embedded from './embedded';
import forms from './forms';
import halBody from './hal-body';
import linksTable from './links-table';
import markdownBody from './markdown-body';
import pager from './pager';

/**
 * This component renders an entire resource.
 */
export default async function resource(ctx: Context, body: any, links: Link[], options: SureOptions) {

  const formsHtml = forms(links, options);
  const linksHtml = linksTable(links, options);

  return `
${linksHtml}
${formsHtml}
${await parseBody(ctx, body)}
${await embedded(ctx, body, options)}
${pager(links, options)}
`;

}

async function parseBody(ctx: Context, body: any): Promise<string> {

  if (!body) {
    // Ignore empty bodies
    return '';
  }

  switch (ctx.response.type) {

    case 'application/json' :
    case 'application/problem+json' :
    case 'application/hal+json' :
      return halBody(ctx, body);

    case 'text/markdown' :
      return markdownBody(ctx, body);

    case 'text/csv' :
      return csvBody(ctx, body);

    default:
      return '';

  }

}
