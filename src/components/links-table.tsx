import * as React from 'react';
import { Link } from 'ketting';
import { PageProps } from '../types';

// List of links from the IANA website, auto generated
import * as ianaLinks from '../data/iana-links.json';
// List of links from this project, overrides some IANA links with better
// descriptions
import * as editorLinks from '../data/editor-links.json';
//List of links from the Level 3 REST (https://level3.rest) specification.
import * as level3RestLinks from '../data/level3-rest-links.json';

type LinkDescriptions = Record<string, {href: string; description: string}>;

const linkDescriptions: LinkDescriptions = {
  ...ianaLinks,
  ...editorLinks,
  ...level3RestLinks
};

export function LinksTable(props: PageProps) {

  const linkRows = [];
  // Grouping links by rel.
  const groups: { [rel: string]: Link[] } = {};

  for (const link of props.resourceState.links.getAll()) {

    if (!props.options.allLinks &&
        (props.options.hiddenRels.includes(link.rel) || link.rel in props.options.navigationLinks || (link as any).rendered))
    {
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

      const linkBadges = [];
      if (link.hints?.allow) {
        for(const method of link.hints.allow) {
          linkBadges.push(<span key={method} className={`link-badge method-${method.toLowerCase()}`}>{method.toUpperCase()}</span>);
        }
      }
      if (link.hints?.status) {
        switch (link.hints.status) {
          case 'deprecated' :
            linkBadges.push(<span key="deprecated" className="link-badge status-deprecated">Deprecated</span>);
            break;
          case 'gone' :
            linkBadges.push(<span key="gone" className="link-badge status-gone">Gone</span>);
            break;
        }
      }
      linkRows.push(<tr key={'link-' + index}>
        {index===0 ? <td rowSpan={linkCount}><LinkRel link={link} /></td> : null}
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
  </>;

}

type LinkRelProps = {
  link: Link;
}

function LinkRel(props: LinkRelProps) {

  const rel = props.link.rel;
  if (linkDescriptions[rel]!==undefined) {
    const ianaLink = linkDescriptions[rel];
    return <a className="definition" title={ianaLink.description} href={ianaLink.href}>{rel}</a>;
  } else {
    return <>{rel}</>;
  }

}
