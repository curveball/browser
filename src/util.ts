import * as highlight from 'highlight.js';
import { Link } from 'ketting';
import * as url from 'url';
import {
  NavigationLink,
  NavigationPosition,
  Options,
} from './types';
import { State, Client } from 'ketting';
import { Context } from '@curveball/core';

/**
 * Returns the list of links for a section.
 *
 * This function sorts and normalizes the link.
 */
export function getNavLinks(links: Link[], options: Options, position: NavigationPosition): Array<Link & NavigationLink> {

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
      context: link.context,
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
 * We use Ketting for a lot of the parsing.
 *
 * The main object that contains a response in Ketting is a 'State' object,
 * to get a State, we need a Response object, as it's part of the fetch()
 * specification.
 *
 * So we go from ctx.response, to Response, to State.
 */
export async function contextToState(ctx: Context): Promise<State> {

  /**
   * We need a fake bookmark url
   */
  const client = new Client('http://hal-browser.test');
  const headers: Record<string, string> = {};
  for(const [name, value] of Object.entries(ctx.response.headers.getAll())) {
    if (typeof value === 'number') {
      headers[name] = value.toString();
    } else if (Array.isArray(value)) {
      headers[name] = value.join(', ');
    } else {
      headers[name] = value;
    }
  }

  const response = new Response(ctx.response.body, {
    status: ctx.status,
    headers,
  });

  return client.getStateForResponse(ctx.path, response);

}
