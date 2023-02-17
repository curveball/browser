import * as React from 'react';
import { Link } from 'ketting';
import { NavigationLink, PageProps } from '../types.js';
import { getNavLinks } from '../util.js';

export function Navigation(props: PageProps) {

  const links = props.resourceState.links.getAll();
  const options = props.options;

  return <>
    <ul>
      <NavLinks links={getNavLinks(links, options, 'header')} />
    </ul>
    <ul>
      <NavLinks links={getNavLinks(links, options, 'header-right')} />
    </ul>
  </>;

}

function NavLinks(props: {links: Array<Link & NavigationLink>}) {

  const elems = props.links.map(link => {
    return <li key={link.rel + '|' + link.href}>
      <a href={link.href} rel={link.rel} title={link.title} className="no-label">
        <img src={link.icon} />
        <span className="label">{link.title}</span>
      </a>
    </li>;
  });
  return <>{elems}</>;

}
