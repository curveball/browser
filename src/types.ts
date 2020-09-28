import { Link, State } from 'ketting';

/**
 * Options after clean-up.
 *
 * Basically the same but nothing is optional.
 */
export type Options = {
  /**
   * Application title
   */
  title: string,
  
  /**
   * List of custom stylesheets to embed
   */
  stylesheets: string[],

  /**
   * List of links that should be lifted to navigation sections
   */
  navigationLinks: SureNavigationLinkMap,

  /**
   * Where the base assets are located
   */
  assetBaseUrl: string,

  /**
   * Should this plugin handle serving the assets.
   *
   * Disable if the assets are hosted elsewhere
   */
  serveAssets: boolean,

  /**
   * List of hardcoded links that should show up on every page.
   */
  defaultLinks: Link[],

  /**
   * List of uninteresting link relationships that should be hidden by default.
   */
  hiddenRels: string[],

  /**
   * If turned on, full JSON bodies are always rendered.
   * 
   * This can also be turned on during runtime by adding a ?_browser-fullbody
   * query parameter
   */
  fullBody: boolean,
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
 * Where Navigation links should appear
 */
export type NavigationPosition = 'header' | 'header-right' | 'pager' | 'alternate';

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
  position?: NavigationPosition,

  // Set this to to make an icon appear earlier or later. Default is 0, lower is earlier.
  priority?: number,

  // Whether or not to show the 'title' as the button label.
  showLabel?: boolean

};

export type PageProps = {
  resourceState: State,
  options: Options,
}
