import { State } from 'ketting';
import { highlightJson } from '../util';
import { Context } from '@curveball/core';

export default function halBody(ctx: Context, state: State) {

  const tmpBody = Object.assign({}, state.data);

  if (!('_browser-fullbody' in ctx.query)) {
    delete tmpBody._links;
    delete tmpBody._embedded;
  }

  const html =
`      <h2>Contents</h2>
      <code class="hljs"><pre>${highlightJson(tmpBody)}</pre></code>
`;

  return html;

}
