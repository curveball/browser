import * as React from 'react';
import * as url from 'url';
import { PageProps } from '../types';
import { getNavLinks } from '../util';

type Type = {
  [s: string]: {
    label: string;
    cssClass: string;
  };
};

const types: Type = {
  'csv': {
    label: 'CSV',
    cssClass: 'type-csv',
  },
  'atom+xml': {
    label: 'ATOM',
    cssClass: 'type-feed',
  },
  'rss+xml': {
    label: 'RSS',
    cssClass: 'type-feed',
  },
};

export function Alternate(props: PageProps) {

  const links = getNavLinks(props.resourceState.links.getAll(), props.options, 'alternate');
  if (!links.length) {
    return null;
  }

  const alternateElems = links.map( link => {
    let cssClass;
    let label;

    if (link.type) {
      const subtype = link.type.split('/')[1];

      let typeInfo = types[subtype];
      if (typeInfo === undefined) {
        typeInfo = {
          cssClass: 'type-' + subtype,
          label: subtype.toUpperCase(),
        };
      }
      cssClass = typeInfo.cssClass;

      label = types[subtype] !== undefined ? types[subtype].label : subtype.toUpperCase();
    } else {
      label = link.title ? link.title : link.rel;
    }

    let href = link.href;
    // If the url is relative, we're adding our secret argument to make the Accept header work.
    if ((href==='/' || href.match(/^\/[^/]/) !== null) && link.type) {
      const urlObj = url.parse(href, true);
      urlObj.query['_browser-accept'] = link.type;
      urlObj.search = null;
      href = url.format(urlObj);
    }

    return <a href={href} rel={link.rel} key={label} title={label} className={cssClass}>{label}</a>;

  });

  return <div className="alternate">
    <h3>Other formats</h3>
    <ul>
      {alternateElems}
    </ul>
  </div>;

}
