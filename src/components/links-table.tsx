import React from 'react';
import { Link } from 'ketting';
import { PageProps } from '../types';

export function LinksTable(props: PageProps) {

  const linkRows = [];
  // Grouping links by rel.
  const groups: { [rel: string]: Link[] } = {};

  for (const link of props.resourceState.links.getAll()) {

    if (props.options.hiddenRels.includes(link.rel) || link.rel in props.options.navigationLinks || (link as any).rendered) {
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
    let index = 0;

    for (const link of group) {

      let linkBadges = null;
      if (link.hints && link.hints.status) {
        switch (link.hints.status) {
          case 'deprecated' :
            linkBadges = <span className="link-badge status-deprecated">Deprecated</span>;
            break;
          case 'gone' :
            linkBadges = <span className="link-badge status-gone">Gone</span>;
            break;
        }
      }
      linkRows.push(<tr key={'link-' + index}>
        {index===0 ? <td rowSpan={linkCount}>{link.rel}</td> : null}
        {link.templated ? <td>{link.href}</td> : <td><a href={link.href}>{link.href}</a></td> }
        <td>{link.title}{linkBadges}</td>
      </tr>);

      index++;

    }


  }

  if (!linkRows.length) return null;

  return <>
    <h2>Links</h2>
    <table className="links">
      <tr>
        <th>Relationship</th><th>Url</th><th>Title</th>
      </tr>
      {linkRows}
    </table>
  </>

}
