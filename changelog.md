Changelog
=========

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
