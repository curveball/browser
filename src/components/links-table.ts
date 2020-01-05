import { Link, SureOptions } from '../types';
import { h } from '../util';

export default function linksTable(links: Link[], options: SureOptions): string {

  let linkHtml = '';

  // Grouping links by rel.
  const groups: { [rel: string]: Link[] } = {};

  for (const link of links) {

    if (options.hiddenRels.includes(link.rel) || link.rel in options.navigationLinks || link.rendered) {
      continue;
    }

    if (groups[link.rel]) {
      groups[link.rel].push(link);
    } else {
      groups[link.rel] = [link];
    }
  }

  for (const group of Object.values(groups)) {

    const linkCount = group.length;
    let first = true;

    for (const link of group) {

      linkHtml += '<tr>';
      if (first) {
        linkHtml += `<td rowspan="${linkCount}">${h(link.rel)}</td>`;
        first = false;
      }
      if (link.templated) {
        linkHtml += `<td>${h(link.href)}</td>`;
      } else {
        linkHtml += `<td><a href="${h(link.href)}">${h(link.href)}</a></td>`;
      }
      let linkBadges = '';
      if (link.hints && link.hints.status) {
        switch (link.hints.status) {
          case 'deprecated' :
            linkBadges = ' <span class="link-badge status-deprecated">Deprecated</status>';
            break;
          case 'gone' :
            linkBadges = ' <span class="link-badge status-gone">Gone</status>';
            break;
        }
      }
      linkHtml += '<td>' + (link.title ? h(link.title) : '') + linkBadges + '</td>';
      linkHtml += '</tr>\n';

    }


  }

  if (!linkHtml) {
    // No links
    return '';
  }

  return `
    <h2>Links</h2>
    <table class="links">
      <tr>
        <th>Relationship</th><th>Url</th><th>Title</th>
      </tr>
      ${linkHtml}
    </table>
  `;

}
