import { Context } from '@curveball/core';
import { highlightJson } from '../util';

export default function halBody(ctx: Context, body: any) {

  console.log('halBodyStart', body);
  const tmpBody = Object.assign({}, body);

  if (!('_browser-fullbody' in ctx.query)) {
    delete tmpBody._links;
    delete tmpBody._embedded;
  }

  const html =
`      <h2>Contents</h2>
      <code class="hljs"><pre>${highlightJson(tmpBody)}</pre></code>
`;

  console.log('halBodyEnd', body);
  return html;

}
