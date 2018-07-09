import { Link, SureOptions } from '../types';
import { getNavLinks, h } from '../util';

export default function generateNavigation(links: Link[], options: SureOptions): string {

  const html: string[] = [];

  for (const link of getNavLinks(links, options, 'header')) {

    html.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(link.title) }">` +
      `<img src="${ link.icon }" />${ link.showLabel ? ' ' + h(link.title) : ''}</a>`
    );

  }

  if (!html.length) {
    return '';
  }

  const result = '    <ul>\n      <li>' + html.join('</li>\n      <li>') + '      </li>\n    </ul>\n';

  return result;

}

