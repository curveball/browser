import { Context } from '@curveball/core';
import { Link, SureOptions } from '../types';
import parseHalForms from './forms/hal-forms';
import parseTemplatedLinks from './forms/templated-links';

export default function forms(ctx: Context, links: Link[], options: SureOptions): string {

  let formHtml = '';
  formHtml += parseTemplatedLinks(links, options);

  const target = '_htarget' in ctx.request.query ? ctx.request.query._htarget : ctx.request.path;
  formHtml += parseHalForms(target, ctx.response.body);

  if (!formHtml) {
    // No links
    return '';
  }

  return `
    <h2>Forms</h2>
    ${formHtml}
  `;

}
