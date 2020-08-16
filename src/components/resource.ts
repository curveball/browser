import { Context } from '@curveball/core';
import { SureOptions } from '../types';
import csvBody from './csv-body';
import embedded from './embedded';
import forms from './forms';
import halBody from './hal-body';
import linksTable from './links-table';
import markdownBody from './markdown-body';
import pager from './pager';
import { State } from 'ketting';

/**
 * This component renders an entire resource.
 */
export default async function resource(ctx: Context, state: State, options: SureOptions) {

  const formsHtml = forms(ctx, state, options);
  const linksHtml = linksTable(state, options);

  return `
${linksHtml}
${formsHtml}
${await parseBody(ctx, state)}
${await embedded(ctx, state, options)}
${pager(state, options)}
`;

}

async function parseBody(ctx: Context, state: State): Promise<string> {

  if (!state.data) {
    // Ignore empty bodies
    return '';
  }

  const contentType = state.contentHeaders().get('Content-Type');

  switch (contentType) {

    case 'application/json' :
    case 'application/problem+json' :
    case 'application/hal+json' :
      return halBody(ctx,state);

    case 'text/markdown' :
      return markdownBody(state);

    case 'text/csv' :
      return csvBody(state);

    default:
      return '';

  }

}
