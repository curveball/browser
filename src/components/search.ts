import querystring from 'querystring';
import url from 'url';
import { Link, SureOptions } from '../types';
import { h } from '../util';

export default function generateSearch(links: Link[], options: SureOptions): string {

  const searchRel = links.find( link => link.rel === 'search');
  if (searchRel === undefined) {
    return '';
  }
  if (!searchRel.templated) {
    return '';
  }

  // We only support a very specific format. The link must be
  // templated, have at most 1 templated field, and that field must
  // appear in the query parameter.
  //
  // Sample format:
  // {
  //   href: "/search?language=nl{?q}",
  //   templated: true
  // }
  //
  // This regex might capture invalid templates, but it's not up to us to
  // validate it.
  const matches = searchRel.href.match(/^([^{]+){\?([a-zA-z0-9]+)}([^{]*)$/);
  if (matches === null) {
    return '';
  }

  // Url with the template variable stripped.
  const newUrl = matches[1] + matches[3];

  const [action, queryStr] = newUrl.split('?');
  const query = querystring.parse(queryStr);

  let html = `<form method="GET" action="${h(action)}" class="search">`;
  html += '<img src="' + url.resolve(options.assetBaseUrl, 'icon/search.svg') + '" />';
  for (const pair of Object.entries(query)) {
    html += `<input type="hidden" name="${h(pair[0])}" value="${h(<string> pair[1])}" />`;
  }

  html += `<input type="search" placeholder="Search" name="${h(matches[2])}" />`;
  html += '</form>';

  return html;

}

