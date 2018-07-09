0.4.1 (2018-??-??)
==================

* Don't turn templated HAL links into real HTML links.
* CSV layout improvements.
* Don't break when the response body is `null`.


0.4.0 (2018-08-09)
==================

* Support for `text/markdown`
* Support for `text/csv`
* Added default `code-repository` link to navigation.


0.3.0 (2018-07-08)
==================

* Going with a Material design, and new color scheme.
* New syntax highlighting css sheet (`idea.css`).
* Previous/next links are now in the bottom.
* It's possible to turn on button labels.
* It's possibel to determine the button label order.
* Added a search field, if a `search` link exists that's templated and has a
  single templated query parameter.
* Filtering out templated links from navigations.


0.2.3 (2018-07-07)
==================

* Another mime-type tweak. Apprarently this problem only appears in
  some environments. Sorry for the noise.


0.2.2 (2018-07-07)
==================

* Fixed again: css files still didn't have the right Content-Type.


0.2.1 (2018-07-07)
==================

* Fixed: assets were not getting the right Content-Type


0.2.0 (2018-07-07)
==================

* Automatically generate navigation icons.
* Hide uninteresting links.
* Automatically detect title of resource.
* Colorscheme refresh. Still not great. #notadesigner
* Lots of tiny tweaks and bugfixes.
* Serve `.svg` and `.css` files out of the box.

0.0.2 (2018-07-02)
=================

* Added styles to package.
* Bit more docs.


0.0.1 (2018-07-02)
==================

* First version
