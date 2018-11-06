import { Context } from '@curveball/core';
import { SureOptions } from '../types';
import { getHalLinks, h } from '../util';
import resource from './resource';

export default async function embedded(ctx: Context, body: any, options: SureOptions): Promise<string> {

  if (!body || !body._embedded) {
    return '';
  }

  let html = '<h2>Embedded</h2>';
  for (const [rel, linkOrList] of Object.entries(body._embedded)) {

    if (Array.isArray(linkOrList)) {
      for (const link of linkOrList) {
        html += await renderEmbedded(ctx, link, resource, options);
      }
    } else {
      html += await renderEmbedded(ctx, rel, linkOrList, options);
    }

  }

  return html;

}

async function renderEmbedded(ctx: Context, rel: string, body: any, options: SureOptions): Promise<string> {

  const selfLink = body._links.self.href;
  const summary = rel + ': ' + selfLink;

  return `
<details>
  <summary>${h(summary)}</summary>
  ${await resource(ctx, body, getHalLinks(body), options)}
</details>
`;

}
