import { State } from 'ketting';
import * as querystring from 'querystring';
import * as url from 'url';
import * as React from 'react';
import { Options } from '../types';

type Props = {
  options: Options;
  resourceState: State;
};

export function Search(props: Props) {

  const searchLink = props.resourceState.links.get('search');

  // No search link
  if (!searchLink) return null;

  // Search link was not templated, so it's useless.
  if (!searchLink.templated) return null;

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
  const matches = searchLink.href.match(/^([^{]+){\?([a-zA-z0-9]+)}([^{]*)$/);
  if (matches === null) {
    return null;
  }

  // Url with the template variable stripped.
  const newUrl = matches[1] + matches[3];

  const [action, queryStr] = newUrl.split('?');
  const query:Record<string,string|string[]|undefined> = querystring.parse(queryStr);

  const hiddenFields = Object.entries(query).map( entry => {
    return <input type="hidden" name={entry[0]} value={entry[1]} />;

  });

  return <form method="GET" action={action} className="search">
    <img src={url.resolve(props.options.assetBaseUrl, 'icon/search.svg')} alt="Search icon" />
    {hiddenFields}
    <input type="search" placeholder="Search" name={matches[2]} />
  </form>;

}
