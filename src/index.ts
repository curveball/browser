import { Middleware, invokeMiddlewares } from '@curveball/kernel';
import generateHtmlIndex from './html-index.js';
import { NavigationLinkMap, Options } from './types.js';
import staticMw from '@curveball/static';

export const supportedContentTypes = [
  'application/json',
  'application/hal+json',
  'application/problem+json',
  'application/schema+json',
  'text/markdown',
  'text/csv',
  'application/prs.hal-forms+json',
  'application/vnd.siren+json',
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
  'acl': true,
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
    icon: 'icon/edit.svg',
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

export default function browser(options?: Partial<Options>): Middleware {

  const stat = staticMw({
    staticDir: __dirname + '/../assets',
    pathPrefix: '/_hal-browser/assets',
    maxAge: 3600,
  });

  const realOptions = normalizeOptions(options);
  return async (ctx, next) => {

    const requestOptions = {
      ...realOptions
    };
    if (options?.fullBody === undefined && '_browser-fullbody' in ctx.query) {
      requestOptions.fullBody = true;
    }
    if (requestOptions.serveAssets && ctx.path.startsWith('/_hal-browser/')) {
      return invokeMiddlewares(ctx, [stat]);
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
    if (cd?.startsWith('attachment')) {
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
      await generateHtmlIndex(ctx, requestOptions);
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
function normalizeOptions(options?: Partial<Options>): Options {

  if (typeof options === 'undefined') {
    options = {};
  }

  const defaults: Partial<Options> = {
    title: 'API Browser',
    theme: 'default',

    stylesheets: [],
    defaultLinks: [
      {
        context: '/',
        href: '/',
        rel: 'home',
        title: 'Home',
      }
    ],
    hiddenRels: [
      'self',
      'curies',
    ],
    assetBaseUrl: '/_hal-browser/assets/',
    serveAssets: true,
    fullBody: false,
    allLinks: false,
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

  const newOptions:Options = Object.assign(defaults, options) as Options;
  return newOptions;

}

