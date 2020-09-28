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

function NavLinks({links}: {links: Array<Link & NavigationLink>}) {

  const elems = links.map(link => {
    return <a href={link.href} rel={link.rel} title={link.title}>
      <img src={link.icon} />
      { link.showLabel ? ' ' + link.title : ''}
      </a>
  });
  return <>{elems}</>

}
