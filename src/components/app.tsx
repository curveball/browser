import { State } from 'ketting';
import * as React from 'react';
import * as url from 'url';
import { PageProps } from '../types';

import { Search } from './search';
import { Navigation } from './navigation';
import { Alternate } from './alternate';
import { Resource } from './resource';

export function App(props: PageProps) {

  const stylesheets = props.options.stylesheets.map( ss => {
    const u = url.resolve(props.options.assetBaseUrl, ss);
    return <link rel="stylesheet" href={u} type="text/css" key={u} />;
  });

  const resourceTitle = getResourceTitle(props.resourceState);
  const appTitle = props.options.title;

  return <html>
    <head>
      <title>{resourceTitle + ' - ' + appTitle}</title>
      <meta charSet="utf-8" />
      {stylesheets}
      <link rel="icon" href={url.resolve(props.options.assetBaseUrl, 'curveball.svg')} key="icon" />
      <script type="module" src={url.resolve(props.options.assetBaseUrl, 'js/html-form-enhancer.js')}></script>
    </head>
    <body>
      <header>
        <h1><span className="resource-title"><a href={props.resourceState.uri} rel="self">{resourceTitle}</a></span> <span className="divider">-</span> <span className="app-title">{appTitle}</span></h1>
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
    // We're passing in localhost because passing in *something*
    // is required, and we're only interested in the pathname anyway.
    href = new URL(state.uri, 'http://localhost/').pathname;
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

  if (!title && Object.keys(state.data).length === 0 && state.actions().length === 1) {
    // If the resource is (mostly) empty and has a single action, we use the
    // name of the action of the title.
    title = state.actions()[0].title;
  }

  // As a last resort, we support a 'Title' HTTP header.
  if (!title && state.contentHeaders().has('Title')) {
    title = state.contentHeaders().get('Title');
  }

  if (!title) {
    title = href;
  }

  return title;

}
