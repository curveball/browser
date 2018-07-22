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
 * - alternate
 * - collection
 * - item
 * - stylesheet
 * - up
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
  'author': {
    showLabel: true,
  },
  'code-repository': true,
  'collection' : {
    priority: -10,
    defaultTitle: 'Collection',
  },
  'create-form': {
    showLabel: true,
    defaultTitle: 'Create',
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
  'next': {
    position: 'pager',
    defaultTitle: 'Next page',
    priority: -10,
  },
  'up' : {
    priority: -10,
    defaultTitle: 'Up',
  },
  'previous': {
    position: 'pager',
    defaultTitle: 'Previous page',
    priority: -20,
  },
  'search': true,
};

export { Options } from './types';

export default function browser(options?: Options): Middleware {

  const newOptions = normalizeOptions(options);

  return async (ctx, next) => {

    if (newOptions.serveAssets && ctx.request.path.startsWith('/_hal-browser/assets/')) {
      return serveAsset(ctx);
    }

    // Don't do anything if the raw format was requested
    if ('_browser-raw' in ctx.request.query) {
      return next();
    }

    // Check to see if the client even wants html.
    if (!ctx.request.accepts('text/html')) {
      return next();
    }

    // Doing the inner request
    await next();

    // We only care about transforming a few content-types
    if (!supportedContentTypes.includes(ctx.response.type)) {
      return;
    }

    // Find out the client prefers HTML over the content-type that was actually
    // returned.
    //
    // This is useful if the client submitted a lower q= score for text/html
    if (ctx.request.accepts('text/html', ...supportedContentTypes) === 'text/html') {
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
function normalizeOptions(options: Options): SureOptions {

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
