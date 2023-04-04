import { Context } from '@curveball/kernel';
import { Options, JsonSchema } from './types';
import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';

import { App } from './components/app.js';
import { contextToState } from './util.js';

import '@curveball/validator';

export default async function generateHtmlIndex(ctx: Context, options: Options) {

  normalizeBody(ctx);

  if (!ctx.response.body) {
    return;
  }

  const state = await contextToState(ctx);

  for(const link of options.defaultLinks) {
    state.links.add(link);
  }

  let csrfToken = null;
  // We are casting to any here. If the 'session' middleware is included,
  // the getCsrf method is available, but we don't want to create a dependency
  // to it.
  //
  // Now we can will use getCsrf(), but only if it's defined.
  if ((ctx as any).getCsrf!==undefined) {
    csrfToken = await (ctx as any).getCsrf();
  }

  const jsonSchemas = new Map<string, JsonSchema>();

  if (ctx.schemas) {
    for(const schema of ctx.schemas) {
      jsonSchemas.set(schema.id, schema.schema);
    }
  }

  ctx.response.type = 'text/html; charset=utf-8';
  ctx.response.body = ReactDOMServer.renderToString(
    <App
      resourceState={state}
      options={options}
      csrfToken={csrfToken}
      originalBody={ctx.response.body}
      jsonSchemas={jsonSchemas}
    />
  );

}

function normalizeBody(ctx: Context) {

  if (!ctx.response.body && ctx.response.status === 201) {

    // A default response body for 201 respones.
    ctx.response.body = {
      title: '201 Created',
    };
    if (ctx.response.headers.has('Location')) {
      ctx.response.body._links = {
        next: {
          href: ctx.response.headers.get('Location')
        }
      };
      ctx.response.type = 'application/hal+json';
    }

  }
  if (ctx.response.body instanceof Buffer || ctx.response.body === null) {
    return;
  }


  if (typeof ctx.response.body === 'object') {
    ctx.response.body = JSON.stringify(ctx.response.body);
    return;
  }



}
