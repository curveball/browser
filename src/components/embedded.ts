import { SureOptions } from '../types';
import { h, highlightJson } from '../util';

export default function embedded(body: any, options: SureOptions): string {

  if (!body || !body._embedded) {
    return '';
  }

  let html = '<h2>Embedded</h2>';
  for (const [rel, item] of Object.entries(body._embedded)) {

    if (Array.isArray(item)) {
      for (const resource of item) {
        html += renderEmbedded(rel, resource);
      }
    } else {
      html += renderEmbedded(rel, item);
    }

  }

  return html;

}

function renderEmbedded(rel: string, body: any): string {

  const selfLink = body._links.self.href;
  const summary = rel + ': ' + selfLink;

  return `
<details>
  <summary>${h(summary)}</summary>
  <code class="hljs"><pre>${highlightJson(body)}</pre></code>
</details>
`;

}
