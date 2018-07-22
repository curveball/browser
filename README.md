HAL browser
===========

This package provides a middleware for HAL APIs.

The middleware looks for HAL and JSON responses, and automatically converts
them into a HTML interface if a browser access them.

It does so via the `Accept: text/html` header. If this header is not provided,
the middleware does nothing.

It automatically decorates the following formats:

* `application/json`
* `application/problem+json`
* `application/hal+json`
* `text/markdown`


Screenshot
----------

An example. If a API normally returns the following HAL format:

```json
{
  "_links": {
    "self": { "href":"/testing" },
    "previous": { "href":"/testing/?page=1", "title":"Previous page" },
    "next": { "href":"/testing/?page=2", "title":"Next page" },
    "author": { "href":"https://evertpot.com", "title":"Evert Pot" },
    "help": { "href":"https://google.com/", "title":"Google it" },
    "search": { "href":"https://google.com/{ ?q }", "templated":true },
    "edit": { "href":"/testing" }, "create-form":{ "href":"/testing" },
    "my-link": { "href":"/foo-bar", "title":"Custom link" }
  },
  "msg":"Hello world!",
  "version":"0.3.0",
  "name":"test resource!"
}
```

The browser will automatically convert it to this HTML format:

![Screenshot from 0.3.0](https://github.com/evert/hal-browser/blob/master/screenshots/0.3.0.png)

Supported frameworks
--------------------

* [Curveball][1] - *DONE*
* [Express][2] - *DONE*
* [Koa][3] - TODO

Installation
------------

    npm install hal-browser


Getting started
---------------

### Curveball

```typescript
import { Application } from 'curveball/@core';
import halBrowser from 'hal-browser';

const app = new Application();
app.use(halBrowser({});
```

### Express

Express support is handled via a special express middleware. Check out the
[hal-browser-express][5] package.


### Koa

TODO

### Options

The halBrowser function takes an options object, which can take the following
settings:

* `title` - Change the main title.
* `stylesheets` - Provide your own stylesheets. This is an array of strings.
  these are relative urls, and they are automatically expanded based on the
  `assetBaseUrl` setting.
* `navigationLinks` - Specify (or remove) links that show up in the top
  navigation.
* `serveAssets` - by default the browser plugin will also take responsibility
  for serving icons and stylesheet. If you're hosting these assets elsewhere,
  set this to `false`.
* `defaultLinks` - A list of links that will show up by default, whether or not
  they were specified by the API. By default a `home` link is added here.
* `hiddenRels` - List of relationship types that will be hidden from the user by
  default. This can be used for links that are simply not interesting for a human
  to see. (default: `['self', 'curies']`.

Example:

```javascript
app.use(halBrowser({
  title: 'My API',
  stylesheets: [
    '/my-stylesheet.css',
  ],

  // This should end with a / generally.
  assetBaseUrl: 'http://some-cdn.example.org/',

  navigationLinks: {
    // Create new 'author' button
    'author' : {
      // optional css class, by default this will be `rel-author`
      cssClass: 'rel-blabla',

      // Optional title to show when hovering over button
      defaultTitle: 'Click me',

      // Override icon. Also optional
      icon: 'icons/foobar.svg',

      // Either 'header' (default) or 'pager'
      position: 'header'

      // Set the order. Lower is earlier. Default is 0.
      priority: -100,

    },
    // passing 'true' will use default setting for the button
    'help' : true,

    // passing 'null' will remove the icon, if it was a default icon
    'up': null,
  },

  defaultLinks: [
    // Every page will have a 'help' link
    {
      rel: 'help',
      href: 'https://example.org/help',
      title: 'Support',
    }
  ],
});
```

Future features
---------------

* Add a link to allow the user to see the raw format.
* Show metadata, such as `Last-Modified`
* Automatically generate forms for templated links.

[1]: https://github.com/expressjs/core
[2]: https://expressjs.com/
[3]: https://koajs.com/
[4]: https://github.com/isagalaev/highlight.js/
[5]: https://github.com/evert/hal-browser-express/
