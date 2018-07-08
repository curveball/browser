HAL browser
===========

This package provides a middleware for HAL APIs.

The middleware looks for HAL and JSON responses, and automatically converts
them into a HTML interface if a browser access them.

It does so via the `Accept: text/html` header. If this header is not provided,
the middleware does nothing.


Screenshot
----------

An example. If a API normally returns the following HAL format:

```json
{
  "_links": {
    "self": {
      "href": "/testing"
    },
    "previous": {
      "href": "/testing/?page=1",
      "title": "Previous page"
    },
    "next": {
      "href": "/testing/?page=2",
      "title": "Next page"
    },
    "author": {
      "href": "https://evertpot.com",
      "title": "Evert Pot"
    },
    "help": {
      "href": "https://google.com/",
      "title": "Google it"
    },
    "search": {
      "href": "https://google.com/"
    },
    "edit": {
      "href": "/testing"
    },
    "create-form": {
      "href": "/testing"
    }
  },
  "msg": "Hello world!",
  "version": "0.2.0",
  "name": "test resource!"
  }
```

The browser will automatically convert it to this HTML format:

![Screenshot from 0.2.0](https://github.com/evert/hal-browser/blob/master/screenshots/0.2.0.png)

Supported frameworks
--------------------

* [Curveball][1] - *DONE*
* [Express][2] - TODO
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
app.use(halBrowser({
  title: 'HAL Browser',
});
```

The HAL browser ships with 2 really basic stylesheets in the `styles`
directory:

* `main.css` - Main interface css
* `solarized-dark.css` - A syntax highlighting stylesheet lifted from the
  [Highlight.js][4] project, and originally created by (c) Jeremy Hull

For best effect you'll want both stylesheets!

### Express

TODO

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

```javacript
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

* Detect `alternate` links and create an appropriate interface for allowing
  users to select them.
* Add a link to allow the user to see the raw format.
* Support displaying `text/csv` as a table.
* Support HTTP Link headers.
* Detect `search` links and show a search field.
* A better interface for `_embedded`.
* Show metadata, such as `Last-Modified`
* Automatically generate forms for templated links.

[1]: https://github.com/expressjs/core
[2]: https://expressjs.com/
[3]: https://koajs.com/
[4]: https://github.com/isagalaev/highlight.js/
