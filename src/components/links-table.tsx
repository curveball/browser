import * as React from 'react';
import { Link } from 'ketting';
import { PageProps } from '../types.js';
import { readFileSync } from 'node:fs';

type LinkDescriptions = Record<string, {href: string; description: string}>;

function loadLinkData(fileName: string) {
  return JSON.parse(
    readFileSync(new URL(import.meta.url + '/..').pathname + '/../data/' + fileName + '.json', 'utf-8')
  );
}

const linkDescriptions: LinkDescriptions = {
  ...loadLinkData('iana-links'),
  ...loadLinkData('editor-links'),
  ...loadLinkData('level3-rest-links')
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
    const link = linkDescriptions[rel];
    return <a className="definition" title={link.description} href={link.href}>{rel}</a>;
  } else {
    return <>{rel}</>;
  }

}
