import { highlightJson } from '../util';

export default function halBody(body: any) {

  const tmpBody = Object.assign(body);
  delete tmpBody._links;
  delete tmpBody._embedded;

  const html =
`      <h2>Contents</h2>
      <code class="hljs"><pre>${highlightJson(tmpBody)}</pre></code>
`;

  return html;

}
