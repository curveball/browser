import { Link, SureOptions, NavigationLink } from '../types';
import { getNavLinks, h } from '../util';

export default function navigation(links: Link[], options: SureOptions): string {

  return (`
    <ul>
      ${navList(getNavLinks(links, options, 'header'))}
    </ul>
    <ul>
      ${navList(getNavLinks(links, options, 'header-right'))}
    </ul>
`);

}

function navList(links: (Link & NavigationLink)[]) {

  const html: string[] = [];

  for (const link of links) {

    html.push(
      `<a href="${ h(link.href) }" rel="${ h(link.rel) }" title="${ h(link.title) }">` +
      `<img src="${ link.icon }" />${ link.showLabel ? ' ' + h(link.title) : ''}</a>`
    );

  }

  return '      <li>' + html.join('</li>\n      <li>') + '</li>\n';


}
