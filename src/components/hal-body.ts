import { highlightJson } from '../util';
import { Context } from '@curveball/core';

export default function halBody(ctx: Context) {

  const tmpBody = Object.assign(ctx.response.body);

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
