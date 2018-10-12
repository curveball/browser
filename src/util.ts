import { Context } from '@curveball/core';
import highlight from 'highlight.js';
import httpLinkHeader from 'http-link-header';
import url from 'url';
import {
  Link,
  NavigationLink,
  NavigationPosition,
  SureOptions,
} from './types';

export function h(input: string): string {

  const map: { [s: string]: string } = {
    '&' : '&amp;',
    '<' : '&lt;',
    '>' : '&gt;',
    '"' : '&quot'
  };

  return input.replace(/&<>"/g, s => map[s]);

}


/**
 * Returns the list of links for a section.
 *
 * This function sorts and normalizes the link.
 */
export function getNavLinks(links: Link[], options: SureOptions, position: NavigationPosition): Array<Link & NavigationLink> {

  const result = [];
  for (const link of links) {

    // Don't handle templated links.
    if (link.templated) {
      continue;
    }
    if (options.navigationLinks[link.rel] === undefined) {
      continue;
    }
    const nl = options.navigationLinks[link.rel];

    if (
      (typeof nl.position === 'undefined' && position !== 'header') ||
      (typeof nl.position !== 'undefined' && nl.position !== position)
    ) {
      continue;
    }

    result.push({
      rel: link.rel,
      href: link.href,
      title: link.title ? link.title : ( nl.defaultTitle ? nl.defaultTitle : link.rel ),
      type: link.type,
      icon: url.resolve(options.assetBaseUrl, nl.icon ? nl.icon : 'icon/' + link.rel + '.svg'),
      priority: nl.priority ? nl.priority : 0,
      showLabel: nl.showLabel,
    });

  }

  return result.sort( (a, b) => a.priority - b.priority);

}

export function highlightJson(body: any): string {

  return highlight.highlight('json', JSON.stringify(body, undefined, '  ')).value;

}

/**
 * Grab all links from the body.
 */
export function fetchLinks(ctx: Context, options: SureOptions): Link[] {

  const result: Link[] = Array.from(options.defaultLinks);

  result.push(...getHalLinks(ctx.response.body));

  const linkHeader = ctx.response.headers.get('Link');
  if (linkHeader) {
    const parsed = httpLinkHeader.parse(linkHeader);
    for (const link of parsed.refs) {
      result.push({
        rel: link.rel,
        href: link.uri,
        title: link.title,
        type: link.type
      });
    }
  }

  return result;

}

function getHalLinks(body: any) {

  if (!body || !body._links) {
    return [];
  }

  const result: Link[] = [];
  for (const rel of Object.keys(body._links)) {

    let linksTmp;

    if (Array.isArray(body._links[rel])) {
      linksTmp = body._links[rel];
    } else {
      linksTmp = [body._links[rel]];
    }
    for (const link of linksTmp) {

      if (!link.href) {
        // tslint:disable:no-console
        console.warn('Incorrect format for HAL link with rel: ' + rel);
      }
      result.push({
        rel: rel,
        href: link.href,
        type: link.type,
        title: link.title,
        templated: link.templated,
      });

    }

  }

  return result;
}
