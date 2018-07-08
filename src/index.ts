import { Middleware } from '@curveball/core';
import generateHtmlIndex from './html-index';
import serveAsset from './serve-asset';
import { NavigationLinkMap, Options, SureOptions } from './types';

const parsedContentTypes = [
  'application/json',
  'application/hal+json',
  'application/problem+json',
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
 * - help
 * - item
 * - stylesheet
 * - up
 * - via
 *
 * source:
 * http://microformats.org/wiki/existing-rel-values
 *
 * - code-repository
 * - icon
 */

const defaultNavigationLinks: NavigationLinkMap = {
  'author': true,
  'create-form': true,
  'edit': true,
  'edit-form' : {
    // alias this
    icon: 'icons/edit.svg',
  }
  'help': true,
  'previous': true,
  'search': true,
};

export default function browser(options?: Options): Middleware {

  const newOptions = normalizeOptions(options);

  return async (ctx, next) => {

    if (newOptions.serveAssets && ctx.request.path.startsWith('/_hal-browser/assets/')) {
      return serveAsset(ctx);
    }

    // Check to see if the client even wants html.
    if (!ctx.request.accepts('text/html')) {
      return next();
    }

    // Doing the inner request
    await next();

    // We only care about transforming a few content-types
    if (!parsedContentTypes.includes(ctx.response.type)) {
      return;
    }

    // Find out the client prefers HTML over the content-type that was actually
    // returned.
    //
    // This is useful if the client submitted a lower q= score for text/html
    if (ctx.request.accepts('text/html', ...parsedContentTypes) === 'text/html') {
      ctx.response.headers.set('Content-Type', 'text/html');
      generateHtmlIndex(ctx, ctx.response.body, newOptions);
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

  if (!options.title) {
    options.title = 'HAL Browser';
  }

  if (!options.stylesheets) {
    options.stylesheets = [
      'css/main.css',
      'css/solarized-dark.css',
    ];
  }

  if (!options.assetBaseUrl) {
    options.assetBaseUrl = '/_hal-browser/assets/';
  }

  if (options.serveAssets === undefined) {
    options.serveAssets = true;
  }

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
      };
    } else {
      options.navigationLinks[navLinkRel] = navLink;
    }
  }

  return <SureOptions> options;

}
