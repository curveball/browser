import { SureOptions } from '../types';
import { h, getHalLinks } from '../util';
import resource from './resource';
import { Context } from '@curveball/core';

export default async function embedded(ctx: Context, body: any, options: SureOptions): Promise<string> {

  console.log(body);
  if (!body || !body._embedded) {
    return '';
  }

  let html = '<h2>Embedded</h2>';
  for (const [rel, item] of Object.entries(body._embedded)) {

    if (Array.isArray(item)) {
      for (const resource of item) {
        html += await renderEmbedded(ctx, rel, resource, options);
      }
    } else {
      html += await renderEmbedded(ctx, rel, item, options);
    }

  }

  console.log(html);

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
