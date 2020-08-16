import { State } from 'ketting';
import { SureOptions } from '../types';
import { getNavLinks, h } from '../util';

export default function generatePager(state: State, options: SureOptions): string {

  const html: string[] = [];

  for (const link of getNavLinks(state.links.getAll(), options, 'pager')) {

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

