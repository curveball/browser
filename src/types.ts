/**
 * Options that may be passed to the middleware.
 */
export type Options = {
  title?: string
  stylesheets?: string[],
  navigationLinks?: NavigationLinkMap,
  assetBaseUrl?: string,
  serveAssets?: boolean,
  defaultLinks?: Link[],
  hiddenRels?: string[],
};

/**
 * Options after clean-up.
 *
 * Basically the same but nothing is optional.
 */
export type SureOptions = {
  title: string,
  stylesheets: string[]
  navigationLinks: SureNavigationLinkMap,
  assetBaseUrl: string,
  serveAssets: boolean,
  defaultLinks: Link[],
  hiddenRels: string[],
};

/**
 * An object containing a list of navigation links.
 */
export type NavigationLinkMap = {

  // Navigation links are nullable so they can be overridden
  [rel: string]: NavigationLink | null | true

};

/**
 * A normalized NavigationLinkMap.
 *
 * The nulls are removed, and 'true' is transformed to some default settings.
 */
export type SureNavigationLinkMap = {

  // Navigation links are nullable so they can be overridden
  [rel: string]: NavigationLink

};

/**
 * A "NavigationLink" specifies a link that will automatically get recognized
 * by the hal-browser and placed in the Navigation bar
 */
export type NavigationLink = {

  // A CSS class. If it's not specified, we'll default to "rel-" + rel
  cssClass?: string,

  // A title we'll put in the HTML title= attribute if it wasn't overriden.
  defaultTitle?: string,

  // A relative URI to an icon. If it's not specified, we'll default to
  // [rel].svg
  icon?: string,

  // Where the icon should appear
  position?: 'header' | 'pager',

  // Set this to to make an icon appear earlier or later. Default is 0, lower is earlier.
  priority?: number,

  // Whether or not to show the 'title' as the button label.
  showLabel?: boolean

};

/**
 * Represents some link.
 */
export type Link = {

  rel: string,
  href: string,
  type?: string,
  title?: string
  templated?: boolean,

};
