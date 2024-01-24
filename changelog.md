Changelog
=========

1.1.0 (2024-01-24)
------------------

* Add color for HTTP QUERY methods.
* Remove node-fetch dependency.


1.0.3 (2024-01-15)
------------------

* Added a DOCTYPE so we're not in quircks mode.
* Added a bug related to loading image assets.


1.0.2 (2024-01-15)
------------------

* Another JSON fail. Files are now explictly included and in the root
  directory.


1.0.1 (2024-01-15)
------------------

* Fix weird Typescript / Node disagreement on whether JSON import assertions
  are required or forbidden


1.0.0 (2024-01-15)
------------------

* Finally! Curveball v1. Only took 6 years.
* CommonJS support has been dropped. The previous version of this library
  supported both CommonJS and ESM. The effort of this no longer feels worth it.
  ESM is the future, so we're dropping CommonJS.
* Now requires Node 18.
* Upgraded to Typescript 5.3.


0.20.5 (2024-01-14)
-------------------

* Support for Typescript 5.
* Updated IANA links database.


0.20.4 (2024-01-14)
-------------------

* Fix: button imports were broken for ESM.


0.20.3 (2023-09-18)
-------------------

* form enhancer script was missing from build
* Update to latest IANA link relation file.


0.20.2 (2023-04-04)
-------------------

* Fix import errors in ESM distribution.


0.20.1 (2023-04-04)
-------------------

* Assets were not distributed in the npm package.


0.20.0 (2023-02-17)
-------------------

* This package now supports ESM and CommonJS modules.
* No longer supports Node 14. Please use Node 16 or higher.


0.19.10 (2022-12-23)
--------------------

* 12% more holiday spriit


0.19.9 (2022-11-09)
-------------------

* Forms/Actions now recognize a few more verbs in titles to give the submit
  button a better label.


0.19.8 (2022-10-31)
-------------------

* Show a default icon for `acl` links.


0.19.7 (2022-10-22)
-------------------

* #159: Added level3.rest link relationship descriptions (@mattbishop).
* #160: Update rels from the iana link relation registry.


0.19.6 (2022-10-22)
-------------------

* We're now guessing the label on submit button for HAL forms based on the verb
  used in the form title.
* Fix a bug in `html-form-enhancer.js`


0.19.5 (2022-10-21)
-------------------

* `html-form-enhancer.js` was missing from the latest release, which caused
  some HAL forms to not work.


0.19.4 (2022-09-29)
-------------------

* If a response has a 'description' property, the browser now renders this
  paragraph near the top of the screen.


0.19.3 (2022-09-20)
-------------------

* #145: Form elements now have `id` attributes and `<label>`s that point to
  them. (@ikbensiep)
* #141: JSON-Schema comments were not rendered in nested objects in the JSON
  viewer. (@syedfkabi)
* #151: `datetime-local` fields weren't rendered correctly if they have a
  value. (@mhum)
* Fixed a table layout issue.


0.19.2 (2022-09-03)
-------------------

* Update Ketting to support Typescript 4.8


0.19.1 (2022-09-03)
-------------------

* Re-release!


0.19.0 (2022-09-03)
-------------------

* Upgraded from `@curveball/core` to `@curveball/kernel`.
* Updated to the latest Ketting, which fixes a problem with rendering HAL
  checkboxes. (@syedfkabir).


0.18.0 (2022-07-14)
-------------------

* Now integrates with `@curveball/validator`. If `describedby` links is
  specified, and it contains a reference to a JSON schema known by the
  validator plugin, it will parse the json schema and extract property
  descriptions.
* Dropped Node 12 support


0.17.4 (2022-04-16)
-------------------

* Known IANA link relationships now have a tooltip with a definition. When the
  rels are clicked, you are now taken to a related (IETF or other) standard
  page.
* Cosmetic improvements in the CSV table output.


0.17.3 (2022-04-08)
-------------------

* Add a missing key= atribute, which should reduce noisy warnings.


0.17.2 (2022-04-07)
-------------------

* Another CSS defect.


0.17.1 (2022-04-07)
-------------------

* Fixed a small css bug.


0.17.0 (2022-04-07)
-------------------

Brand new JSON viewer!

* Supports collapsing/expanding part of the tree
* Automatically generate hyperlinks for strings that are likely links.
* Shows the _original_ JSON, including `_links` and `_embedded`, but these are
  collapsed by default. This should aid in debugging.
* No longer showing double-quotes around JSON property names, but they
  magically re-appear when copy pasting.


0.16.5 (2022-02-01)
-------------------

* Don't show halloween theme on Feb 1st.


0.16.4 (2022-01-11)
-------------------

* Add a curveball logo with outline


0.16.3 (2022-01-06)
-------------------

* Add a curveball logo including the wordmark
* Add a flag allowing users to see 'all links'. Normally links such as `self`
  are hidden in links tables, using the new `allLinks` flag every link will
  always appear in responses.


0.16.2 (2021-12-16)
-------------------

* Upgrade html-form-enhancer package, which fixes a bug related to the `action`
  attribute being sometimes ignored.


0.16.1 (2021-10-29)
-------------------

* If a server returns a `201 Created` status and no body, the browser will now
  generate a default body so users don't see a white page.
* Holiday themes now auto-activate, and don't require a server restart. This
  also means they wont keep lingering after the holiday.
* Fixed a CSS bug in the Halloween theme around the 'pagers'.


0.16.0 (2021-10-18)
-------------------

* #110: Added a halloween theme, which automatically activates the week
  preceding halloween.
* #109: Hightlight.js fixed their types, so the workaround is removed.
* #108: Browser now supports a few more formats for templated URIs and
  automaticalling turning them into forms. It also fails more gracefully with
  invalid forms.
* Compatible with `esModuleInterop: false`.


0.15.5 (2021-09-14)
-------------------

* Workaround for broken Highlight.js


0.15.4 (2021-09-13)
-------------------

* Fix formatting of `datetime-local` value attribute.


0.15.3 (2021-05-23)
-------------------

* Fix warning when stylesheets aren't specified.


0.15.2 (2021-05-23)
-------------------

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

* CSRF tokens will now be added to forms if the `@curveball/session` middleware
  is loaded.


0.11.2 (2021-01-30)
-------------------

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

* Update to latest Ketting 7, which fixes a bug related to rendering forms.


0.11.0-beta.0 (2021-01-20)
--------------------------

* Upgrade to Ketting 7 beta, which has a lot of HAL Forms improvements and adds
  a `<textarea>` feature.


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

* The browser plugin will now render Siren and HAL-FORMS forms for you. This
  will only work great if you use methods and content-types browsers natively
  support, but support for JSON and other methods are planned.
* Fix a React warning.


0.9.2 (2020-09-30)
------------------

* This package is renamed from `hal-browser` to `@curveball/browser`.
* Lots of visual design tweaks
* Fixed link header area.


0.9.1 (2020-09-28)
------------------

* Alpha release.
* New default theme: 'curveball'.
* All HTML rendering is now handled with React server-side rendering.
* Added a favicon.


0.9.0 (2020-08-16)
------------------

* Alpha release.
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
  `register-user`, `logout` from
  [draft-pot-authentication-link][authentication-link].


0.7.3 (2019-04-17)
------------------

* Now showing links as 'Deprecated' or 'Gone' if they are marked as such using
  [draft-nottingham-link-hint][link-hint].


0.7.2 (2019-03-26)
------------------

* Fixed bug: `Content-Disposition` was checked in the Request headers, not the
  response headers.


0.7.1 (2019-03-25)
------------------

* #41: Don't touch responses with `Content-Disposition: attachment`. The intent
  of that header is to allow people to create downloads for users, so it's
  unlikely they want the response re-skinned as HTML.
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
------------------

* Catching a wider net of versions for dependencies.


0.5.2 (2018-08-25)
------------------

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

* Another mime-type tweak. Apprarently this problem only appears in some
  environments. Sorry for the noise.


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
------------------

* Added styles to package.
* Bit more docs.


0.0.1 (2018-07-02)
------------------

* First version

[link-hint]: https://tools.ietf.org/html/draft-nottingham-link-hint
[authentication-link]:
https://tools.ietf.org/html/draft-pot-authentication-link-00
