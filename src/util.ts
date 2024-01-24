import { Link } from 'ketting';
import * as url from 'url';
import {
  NavigationLink,
  NavigationPosition,
  Options,
  Theme,
} from './types.js';
import { State, Client } from 'ketting';
import { Context } from '@curveball/kernel';

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

  return client.getStateForResponse(ctx.path, response as any);

}

/**
 * This is a very rudimentary Templated URI parser.
 *
 * Currently we don't parse the entire syntax, because we are using templated
 * URIs to generate Javascript-free standard HTML forms.
 *
 * In these HTML forms, we can only let users define things in the 'query'
 * part of the URI.
 *
 * If the parser encounters a templated URI that's not parsable, it returns
 * null, otherwise it returns a tuple with three elements:
 *
 * 1. The URI that's the target of the form (without query params)
 * 2. An object containing values that should be added as hidden fields and
 *    values.
 * 3. An array with field names that should be rendered as input fields.
 *
 * Examples of supported formats:
 *   http://example/?foo={bar}
 *   http://example/{?foo}
 *   http://example/?foo=bar{&bar}
 *   http://example/?foo=1{&bar,baz,zim}
 */
export function getFieldsFromTemplatedUri(input: string): null | [string, Record<string,string>, string[]] {

  const fields: string[] = [];
  const hiddenFields: Record<string, string> = {};

  // We only support 2 styles of templated links:
  //
  // https://foo/{?a}{?b}
  //
  // and
  //
  // https://foo/?foo={bar}
  //
  // More formats might be added if they are requested.

  // This regex finds blocks like {?foo}
  const reg = /{(\?|&)[A-Za-z,]+}/g;

  const matches = input.match(reg);
  if (matches) {
    for (const match of matches) {
      // Stripping off {? and }
      const fieldNames = match.slice(2, -1);

      // Splitting at ','
      for (const fieldName of fieldNames.split(',')) {
        fields.push(fieldName);
      }
    }
  }

  // Removing {?foo} blocks.
  const [target, querystring] = input.replace(reg, '').split('?');

  if (target.indexOf('{') !== -1) {
    // We don't support expressions in the path/hostname part of the uri
    return null;
  }

  if (querystring) {
    for (const qsPart of querystring.split('&')) {

      const [field, value] = qsPart.split('=');
      if (!value) {
        // No equals sign
        hiddenFields[field] = '';
      } else if (value.match(/{.*}$/)) {
        // Its a parameter in the form foo={bar}
        fields.push(field);
      } else {
        // It's a regular field such as 'foo=bar'
        hiddenFields[field] = decodeURIComponent(value);
      }

    }
  }

  return [
    target,
    hiddenFields,
    fields
  ];

}

/**
 * Returns the default theme
 *
 * This might alternate depending on the time of the year.
 */
export function getDefaultTheme(): Theme {

  const d = new Date();
  if (d.getMonth()===9 && d.getDate()>25 || d.getMonth()===10 && d.getDate()<2) return 'halloween';
  if (d.getMonth()===11 && d.getDate()>14) return 'xmas';

  return 'curveball';

}
