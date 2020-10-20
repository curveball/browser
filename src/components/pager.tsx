import React from 'react';
import { PageProps } from '../types';
import { getNavLinks } from '../util';

export function Pager(props: PageProps) {

  const elems = [];
  for (const link of getNavLinks(props.resourceState.links.getAll(), props.options, 'pager')) {

    elems.push(<li key={link.rel + '|' + link.href}>
      <a href={link.href} rel={link.rel} title={link.title}>
        <img src={link.icon} /> {link.title}</a>
    </li>);

  }

  if (!elems.length) {
    return null;
  }

  return <nav className="pager">
    <ul>
      {elems}
    </ul>
  </nav>;

}
