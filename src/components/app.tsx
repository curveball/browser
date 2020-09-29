import { State } from 'ketting';
import React from 'react';
import url from 'url';
import { PageProps } from '../types';

import { Search } from './search';
import { Navigation } from './navigation';
import { Alternate } from './alternate';
import { Resource } from './resource';

export function App(props: PageProps) {

  const stylesheets = props.options.stylesheets.map( ss => {
    return <link rel="stylesheet" href={url.resolve(props.options.assetBaseUrl, ss)} type="text/css" />;
  });

  const resourceTitle = getResourceTitle(props.resourceState);
  const appTitle = props.options.title;

  return <html>
    <head>
      <title>{resourceTitle + ' - ' + appTitle}</title>
      <meta charSet="utf-8" />
      {stylesheets}
      <link rel="icon" href={url.resolve(props.options.assetBaseUrl, 'curveball.svg')} />
    </head>
    <body>
      <header>
        <h1><span className="resource-title"><a href="${h(href)}" rel="self">{resourceTitle}</a></span> <span className="divider">-</span> <span className="app-title">{appTitle}</span></h1>
        <Search {...props} />
      </header>

      <nav className="top-nav">
        <Navigation {...props} />
        <Alternate {...props} />
      </nav>

      <main>
        <Resource {...props} />
      </main>

    </body>
  </html>;

}

function getResourceTitle(state: State): string {

  const selfLink = state.links.get('self');

  let title;
  let href;

  if (selfLink) {
    title = selfLink.title;
    href = selfLink.href;
  } else {
    href = state.uri;
  }

  const body = state.data;

  if (body && typeof body === 'object') {
    if (!title && body.title) {
      title = body.title;
    }
    if (!title && body.name) {
      title = body.name;
    }
  }
  if (!title) {
    title = href;
  }

  return title;

}
