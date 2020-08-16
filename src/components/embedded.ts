import { SureOptions } from '../types';
import { h } from '../util';
import resource from './resource';
import { State } from 'ketting';
import { Context } from '@curveball/core';

export default async function embedded(ctx: Context, state: State, options: SureOptions): Promise<string> {

  let html = '<h2>Embedded</h2>';
  for (const embeddedState of state.getEmbedded()) {

    html += await renderEmbedded(ctx, embeddedState, options);

  }

  return html;

}

async function renderEmbedded(ctx: Context, state: State, options: SureOptions): Promise<string> {

  const selfLink = state.links.get('self')!;

  return `
<details>
  <summary>${h(selfLink.href)}</summary>
  ${await resource(ctx, state, options)}
</details>
`;

}
