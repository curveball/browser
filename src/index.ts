import { Middleware } from '@curveball/core';
import generateHtmlIndex from './html-index';
import serveAsset from './serve-asset';
import { NavigationLinkMap, Options, SureOptions } from './types';

export const supportedContentTypes = [
  'application/json',
  'application/hal+json',
  'application/problem+json',
  'text/markdown',
  'text/csv',
];

/*
 * Wanted links support
 *
 * source:
 * https://www.iana.org/assignments/link-relations/link-relations.xhtml
 *
 * - about
 * - stylesheet
 * - via
 *
 * source:
 * http://microformats.org/wiki/existing-rel-values
 * - icon
 */

const defaultNavigationLinks: NavigationLinkMap = {
  'alternate': {
    position: 'alternate',
  },
  'authenticate' : {
    showLabel: true,
    defaultTitle: 'Sign in',
    position: 'header-right',
  },
  'authenticated-as' : {
    showLabel: true,
    defaultTitle: 'Logged in',
    position: 'header-right',
  },
  'author': {
    showLabel: true,
  },
  'code-repository': true,
  'collection' : {
    priority: -10,
    defaultTitle: 'Collection',
    icon: 'icon/up.svg',
    showLabel: true,
  },
  'create-form': {
    showLabel: true,
    defaultTitle: 'Create',
  },
  'describedby': {
    showLabel: true,
    defaultTitle: 'Schema'
  },
  'edit': {
    showLabel: true,
    defaultTitle: 'Edit',
  },
  'edit-form': {
    showLabel: true,
    defaultTitle: 'Edit',
  },
  'help': {
    priority: 10,
  },
  'home': {
    priority: -20,
  },
  'logout' : {
    priority: 30,
    showLabel: true,
    defaultTitle: 'Sign out',
    position: 'header-right',
  },
  'next': {
    position: 'pager',
    defaultTitle: 'Next page',
    priority: -10,
  },
  'up' : {
    priority: -10,
    showLabel: true,
  },
  'previous': {
    position: 'pager',
    defaultTitle: 'Previous page',
    priority: -20,
  },
  'register-user': {
    showLabel: true,
    defaultTitle: 'Register user',
    position: 'header-right',
  },
  'search': true,
};

export { Options } from './types';

export default function browser(options?: Options): Middleware {

  const newOptions = normalizeOptions(options);

  return async (ctx, next) => {

    if (newOptions.serveAssets && ctx.path.startsWith('/_hal-browser/assets/')) {
      return serveAsset(ctx);
    }

    // Check to see if the client even wants html.
    if (!ctx.accepts('text/html')) {
      return next();
    }

    // If the url contained _browser-accept, we use that value to override the
    // Accept header.
    let oldAccept;
    if ('_browser-accept' in ctx.query) {
      oldAccept = ctx.request.headers.get('Accept');
      ctx.request.headers.set('Accept', ctx.query['_browser-accept']);
    }

    // Don't do anything if the raw format was requested
    if ('_browser-raw' in ctx.query) {
      return next();
    }

    // Doing the inner request
    await next();

    if (oldAccept) {
      // Putting the old value back in place
      ctx.request.headers.set('Accept', oldAccept);
    }

    // We only care about transforming a few content-types
    if (!supportedContentTypes.includes(ctx.response.type)) {
      return;
    }

    // If Content-Disposition: attachment was set, it means the API author
    // intended to create a download, we will also not render HTML.
    const cd = ctx.response.headers.get('Content-Disposition');
    if (cd && cd.startsWith('attachment')) {
      return;
    }

    // Find out the client prefers HTML over the content-type that was actually
    // returned.
    //
    // This is useful if the client submitted a lower q= score for text/html.
    //
    // In addition, we also want to make sure that requests for */* result in
    // the original contenttype. Users have to explicitly request text/html.
    if (ctx.accepts(...supportedContentTypes, 'text/html') === 'text/html') {
      await generateHtmlIndex(ctx, newOptions);
    }

  };

}


/**
 * This function does a whole bunch of cleanup of the options object, so
 * everything else can do less work.
 *
 * This makes the rest of the source simpler, and also saves time because it
 * only happens once.
 */
function normalizeOptions(options?: Options): SureOptions {

  if (typeof options === 'undefined') {
    options = {};
  }

  const defaults = {
    title: 'HAL Browser',
    stylesheets: [
      'css/main.css',
      'css/idea.css',
    ],
    defaultLinks: [
      {
        href: '/',
        rel: 'home'
      }
    ],
    hiddenRels: [
      'self',
      'curies',
    ],
    assetBaseUrl: '/_hal-browser/assets/',
    serveAssets: true,
  };

  const tmpNavLinks = Object.assign(
    defaultNavigationLinks,
    options.navigationLinks === undefined ? {} : options.navigationLinks
  );

  options.navigationLinks = {};

  for (const navLinkRel of Object.keys(tmpNavLinks)) {

    const navLink = tmpNavLinks[navLinkRel];
    if (navLink === null) {
      continue;
    }
    if (navLink === true) {
      options.navigationLinks[navLinkRel] = {
        defaultTitle: navLinkRel,
        position: 'header'
      };
    } else {
      options.navigationLinks[navLinkRel] = navLink;
    }
  }

  return <SureOptions> Object.assign(defaults, options);

}
