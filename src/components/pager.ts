import { Link, SureOptions } from '../types';
import { getNavLinks, h } from '../util';

export default function generatePager(links: Link[], options: SureOptions): string {

  const html: string[] = [];

  for (const link of getNavLinks(links, options, 'pager')) {

    html.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(link.title) }">` +
      `<img src="${h(link.icon)}" /> ${h(link.title)}</a>`
    );

  }

  if (!html.length) {
    return '';
  }

  const result = '  <nav class="pager">\n    <ul>\n      <li>' + html.join('</li>\n      <li>') + '      </li>\n    </ul>\n  </nav>\n';
  return result;

}

