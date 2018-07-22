import { Link, SureOptions } from '../types';
import { getNavLinks, h } from '../util';

export default function navigation(links: Link[], options: SureOptions): string {

  const navHtml: string[] = [];

  for (const link of getNavLinks(links, options, 'header')) {

    navHtml.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(link.title) }">` +
      `<img src="${ link.icon }" />${ link.showLabel ? ' ' + h(link.title) : ''}</a>`
    );

  }

  if (navHtml.length) {
    return '    <ul>\n      <li>' + navHtml.join('</li>\n      <li>') + '</li>\n    </ul>\n';
  } else {
    return '';
  }

}

