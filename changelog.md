Changelog
=========

0.15.3 (2021-05-23)
------------------

* Fix warning when stylesheets aren't specified.


0.15.2 (2021-05-23)
------------------

* Run the 'normalizeOptions' script only once: when initializing the
  middleware.


0.15.1 (2021-05-23)
-------------------

* Load custom stylesheets after theme sheets.


0.15.0 (2021-05-23)
-------------------

* Small BC break: setting custom stylesheets no longer removes the 'theme'
  stylesheets. To remove the default theme, set `null` for theme.


0.14.11 (2021-05-23)
--------------------

* Upgrade to Ketting 7 for parsing hypermedia bodies.
* Support the HTTP `Title` header as a last resort to determine a page title.


0.14.10 (2021-04-05)
--------------------

* Fix content-negotiation/alternate links on the root of the API.
* Fix another React warning.


0.14.9 (2021-04-05)
-------------------

* Allow HTML tags in markdown.
* Fix highlight.js depreciation warning.


0.14.8 (2021-03-31)
-------------------

* Tweaks to design of form submission buttons.
* 'Forms' renamed to 'Actions'.
* If a form has no fields (or only hidden fields), the form will get rendered
  as a single button.


0.14.7 (2021-03-07)
-------------------

* Fix the icon for the `edit-form` link.


0.14.6 (2021-03-02)
-------------------

* Last release did not include updated html-form-enhancer files.


0.14.5 (2021-03-02)
-------------------

* Update 'html-form-enhancer' package, which has a few bug fixes.
* Include form enhancher .map files in build, for easier debugging.


0.14.4 (2021-02-27)
-------------------

* Build process tweaks to ensure that vendored .js files get included in
  `assets` directory.


0.14.3 (2021-02-26)
-------------------

* Fix `<select>` rendering bug.


0.14.2 (2021-02-26)
-------------------

* Render select boxes, groups of radios, groups of checkboxes.


0.14.1 (2021-02-26)
-------------------

* Forgot to include .js files in npm package.


0.14.0 (2021-02-25)
-------------------

* If no title can be detected, but there is exactly 1 action/form in a
  resource, use the title from the form.
* Don't render 'Contents' section if there are no properties.
* Prevent HAL forms from sometimes being rendered twice.
* Now published on Github packages.


0.13.0 (2021-02-08)
-------------------

* `application/json` is now supported in forms, using a small helper library.
* Methods other than `POST` and `GET` are supported in forms, using the very
  same library.
* Happy Birthday Mom!


0.12.0 (2021-02-02)
-------------------

* CSRF tokens will now be added to forms if the `@curveball/session`
  middleware is loaded.


0.11.2 (2021-01-30)
--------------------

* Include `src/` in NPN package, for better debugging.


0.11.1 (2021-01-30)
-------------------

* Fix bug in rendering schema+json.


0.11.0 (2021-01-30)
-------------------

* This middleware will now intercept and render `application/schema+json`.


0.11.0-beta.2 (2021-01-26)
--------------------------

* Correctly render Siren 'title' fields.
* Better rendering of checkboxes and radio in forms
* Actually hiding 'hidden' fields.
* Removed 3 react warnings.


0.11.0-beta.1 (2021-01-25)
--------------------------

* Update to latest Ketting 7, which fixes a bug related to rendering
  forms.


0.11.0-beta.0 (2021-01-20)
--------------------------

* Upgrade to Ketting 7 beta, which has a lot of HAL Forms improvements and
  adds a `<textarea>` feature.


0.10.4 (2020-12-05)
-------------------

* Add christmas theme. If not theme is specified, it will automatically enable
  the last 2 weeks of the year.
* Cache assets for 1 hour.


0.10.3 (2020-11-26)
-------------------

* The browser will now show colored labels for common HTTP methods if they
  appear as 'link hints'.
* If no title is given, browser uses the path as the title. The browser no
  removes the query parameters, as it gets unwieldy.
* Use `@curveball/static` for serving static assets, which should give better
  performance.
* Fixing a few more React key warnings.


0.10.2 (2020-10-17)
-------------------

* Now parsing and formatting Siren resources!
* Fixed some layout issues related to forms.


0.10.1 (2020-10-08)
-------------------

* Remove debug statements.


0.10.0 (2020-10-08)
-------------------

* The browser plugin will now render Siren and HAL-FORMS forms for you.
  This will only work great if you use methods and content-types browsers
  natively support, but support for JSON and other methods are planned.
* Fix a React warning.


0.9.2 (2020-09-30)
------------------

* This package is renamed from `hal-browser` to `@curveball/browser`.
* Lots of visual design tweaks
* Fixed link header area.


0.9.1 (2020-09-28) (alpha tag)
------------------------------

* New default theme: 'curveball'.
* All HTML rendering is now handled with React server-side rendering.
* Added a favicon.


0.9.0 (2020-08-16) (alpha tag)
------------------------------

* Using Ketting for all format parsing, which means it will be easier in the
  future to add support for Siren, Collection+JSON, JSON:API and other formats.
* Switch to ESlint.


0.8.6 (2020-01-05)
------------------

* Allow installation on Curveball 0.10.


0.8.5 (2020-01-05)
------------------

* Fix spelling of `ellipsis`.


0.8.4 (2020-01-05)
------------------

* Small design fix in Search field.


0.8.3 (2020-01-05)
------------------

* A few subtle design adjustments.
* `@curveball/core` is now a peerDependency for smoother upgrades.


0.8.2 (2020-01-02)
------------------

* Support URI templates in the format `{?q1,q2}`.


0.8.1 (2019-11-04)
------------------

* Pager buttons had incorrect text color in new theme.


0.8.0 (2019-10-09)
------------------

* New theme! Thank you @sieplfo


0.7.6 (2019-10-02)
------------------

* Small design tweak: Some navigation elements now appear on the right.


0.7.5 (2019-09-13)
------------------

* Update to Curveball 0.9 API.


0.7.4 (2019-05-05)
------------------

* Default icons for the following rels: `authenticate`, `authenticated-as`,
  `register-user`, `logout` from [draft-pot-authentication-link][authentication-link].


0.7.3 (2019-04-17)
------------------

* Now showing links as 'Deprecated' or 'Gone' if they are marked as such
  using [draft-nottingham-link-hint][link-hint].


0.7.2 (2019-03-26)
------------------

* Fixed bug: `Content-Disposition` was checked in the Request headers, not
  the response headers.


0.7.1 (2019-03-25)
------------------

* #41: Don't touch responses with `Content-Disposition: attachment`. The
  intent of that header is to allow people to create downloads for users,
  so it's unlikely they want the response re-skinned as HTML.
* Updated dependencies.
* Stricted typescript settings.


0.7.0 (2019-02-06)
------------------

* Automatically render HTML forms for templated links, where possible.


0.6.3 (2019-01-18)
------------------

* Rendering arrays in `_embedded` was broken.


0.6.2 (2019-01-09)
------------------

* Fully rendered `_embedded` objects.
* Correctly inject `?_browser-accept` if query string was already set.
* Showing `up` link label by default.


0.6.1 (2018-11-01)
------------------

* Some clients default to sending `Accept: */*`. For those clients we want to
  not automatically convert to `text/html`. This fixes the default output for
  Curl and Fetch.


0.6.0 (2018-10-12)
------------------

* It's now possible to get alternative representations in a browser with the
  `?_browser-accept` query parameter.
* Links with the `alternate` rel that are local, automatically get the
  `?_browser-accept` parameter added, so a single resource can now have
  multiple representations on the same url.
* Now using a new package for parsing HTTP Link urls. The old one didn't
  support multiple links with the same `rel`.


0.5.6 (2018-10-04)
------------------

* Default button for `describedby` link. It now assumes it's a JSON-Schema,
  although time will tell if this is correct.
* Updated dependencies


0.5.5 (2018-09-14)
------------------

* Hidden feature: show full JSON bodies if `?_browser-fullbody` is in the url.


0.5.4 (2018-09-06)
------------------

* Don't throw errors on empty bodies.


0.5.3 (2018-09-04)
-----------------

* Catching a wider net of versions for dependencies.


0.5.2 (2018-08-25)
-----------------

* Pull `type` parameter from HTTP Link header as well.


0.5.1 (2018-08-25)
------------------

* Made a few style tweaks.
* Made markdown code snippets look better.
* Fixed icon for `collection` link.


0.5.0 (2018-07-21)
------------------

* #21: Understand and render `_embedded`.
* #7: Parsing HTTP Link header.
* #27: Up and Collection links have a default button.
* #14: Render some buttons for "alternate" links.


0.4.1 (2018-07-09)
------------------

* Don't turn templated HAL links into real HTML links.
* CSV layout improvements.
* Don't break when the response body is `null`.
* Support `string` or `Buffer` for json responses.


0.4.0 (2018-08-09)
------------------

* Support for `text/markdown`
* Support for `text/csv`
* Added default `code-repository` link to navigation.


0.3.0 (2018-07-08)
------------------

* Going with a Material design, and new color scheme.
* New syntax highlighting css sheet (`idea.css`).
* Previous/next links are now in the bottom.
* It's possible to turn on button labels.
* It's possible to determine the button label order.
* Added a search field, if a `search` link exists that's templated and has a
  single templated query parameter.
* Filtering out templated links from navigations.


0.2.3 (2018-07-07)
------------------

* Another mime-type tweak. Apprarently this problem only appears in
  some environments. Sorry for the noise.


0.2.2 (2018-07-07)
------------------

* Fixed again: css files still didn't have the right Content-Type.


0.2.1 (2018-07-07)
------------------

* Fixed: assets were not getting the right Content-Type


0.2.0 (2018-07-07)
------------------

* Automatically generate navigation icons.
* Hide uninteresting links.
* Automatically detect title of resource.
* Colorscheme refresh. Still not great. #notadesigner
* Lots of tiny tweaks and bugfixes.
* Serve `.svg` and `.css` files out of the box.

0.0.2 (2018-07-02)
-----------------

* Added styles to package.
* Bit more docs.


0.0.1 (2018-07-02)
------------------

* First version

[link-hint]: https://tools.ietf.org/html/draft-nottingham-link-hint
[authentication-link]: https://tools.ietf.org/html/draft-pot-authentication-link-00
