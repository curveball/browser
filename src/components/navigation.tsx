import React from 'react';
import { Link } from 'ketting';
import { NavigationLink, PageProps } from '../types';
import { getNavLinks } from '../util';

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

  console.log(props);
  const elems = props.links.map(link => {
    return <li>
      <a href={link.href} rel={link.rel} title={link.title} className="no-label">
        <img src={link.icon} />
        <span className="label">{link.title}</span>
      </a>
    </li>;
  });
  return <>{elems}</>;

}
