import { Context } from '@curveball/core';
import { SureOptions } from '../types';
import parseHalForms from './forms/hal-forms';
import parseTemplatedLinks from './forms/templated-links';
import { State } from 'ketting';

export default function forms(ctx: Context, state: State, options: SureOptions): string {

  let formHtml = '';
  formHtml += parseTemplatedLinks(state, options);

  const target = '_htarget' in ctx.request.query ? ctx.request.query._htarget : ctx.request.path;

  if (ctx.response.is('application/prs.hal-forms+json')) {
    formHtml += parseHalForms(target, ctx.response.body);
  }

  if (!formHtml) {
    // No links
    return '';
  }

  return `
    <h2>Forms</h2>
    ${formHtml}
  `;

}
