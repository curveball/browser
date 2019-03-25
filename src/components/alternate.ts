import url from 'url';
import { Link, SureOptions } from '../types';
import { getNavLinks, h } from '../util';

type Type = {
  [s: string]: {
    label: string;
    cssClass: string;
  }
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

export default function renderAlternate(links: Link[], options: SureOptions): string {

  let result = '';
  let label = '';
  const alternateHtml: string[] = [];
  for (const link of getNavLinks(links, options, 'alternate')) {

    let cssClass = null;
    if (link.type) {
      const subtype = link.type.split('/')[1];

      let typeInfo = types[subtype];
      if (typeInfo === undefined) {
        typeInfo = {
          cssClass: 'type-' + h(subtype),
          label: subtype.toUpperCase(),
        };
      }
      // Only using the last part of the mimetype.
      cssClass = ' class="' + h(typeInfo.cssClass) + '"';

      label = types[subtype] !== undefined ? types[subtype].label : subtype.toUpperCase();
    } else {
      label = link.title ? link.title : link.rel;
    }

    let href = link.href;
    // If the url is relative, we're adding our secret argument to make the Accept header work.
    if (href.match(/^\/[^\/]/) !== null) {
      const urlObj = url.parse(href, true);
      // @ts-ignore. TS hates this line.
      urlObj.query['_browser-accept'] = link.type;
      delete urlObj.search;
      href = url.format(urlObj);
    }

    alternateHtml.push(
      `<a href="${h(href)}" rel="${ h(link.rel) }" title="${ h(label) }"${cssClass}>${h(label)}</a>`
    );

  }

  if (alternateHtml.length) {

    result =
`    <div class="alternate">
      <h3>${h('Other formats')}</h3>
      <ul>
        <li>${ alternateHtml.join('</li>\n      <li>')}</li>
      </ul>
     </div>
`;

  }

  return result;

}

