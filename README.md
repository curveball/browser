Curveball Browser
=================

This package provides a middleware that automatically turns JSON responses
from an API into HTML responses.

It will do so by looking if the API was accessed by a HTTP client that prefers
HTML. Browsers do this by sending an `Accept: text/html` header.

If this middleware spots this, it will kick in and auto-generate a great looking
HTML document.

If this header was not provides, this middleware does nothing.

It automatically decorates the following formats:

* `application/json`
* `application/problem+json`
* `application/hal+json`
* `text/markdown`
* `text/csv`
* `application/prs.hal-forms+json`
* `application/vnd.siren+json`

Screenshot
----------

An example. If an API normally returns the following HAL format:

```json
{
  "_links": {
    "self": { "href": "/testing" },
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
      "href": "https://google.com/{?q}",
      "templated": true
    },
    "edit": { "href": "/testing" },
    "create-form": { "href": "/testing" },
    "my-link": {
      "href": "/foo-bar",
      "title": "Custom link"
    },
    "alternate": [
      {
        "href": "/testing/markdown",
        "type": "text/markdown",
        "title": "Markdown test"
      },
      {
        "href": "/testing/csv",
        "type": "text/csv",
        "title": "Csv test"
      },
      {
        "href": "/testing/rss",
        "type": "application/rss+xml",
        "title": "RSS"
      },
      {
        "href": "/testing/rss",
        "type": "application/atom+xml",
        "title": "Atom"
      }
    ],
    "code-repository": { "href": "https://github.com/evert/hal-browser" },
    "redirect-test": { "href": "/redirect-test" }
  },
  "msg": "Hello world!",
  "version": "0.5.0",
  "name": "test resource!"
}
```

The browser will automatically convert it to this HTML format:

![Screenshot from 0.9.1](https://github.com/evert/hal-browser/blob/master/screenshots/0.9.1.png)

This screenshot is an example of the browser automatically formatting a .csv
and parsing HTTP `Link` headers:

![Screenshot from 0.9.1](https://github.com/evert/hal-browser/blob/master/screenshots/0.9.1-csv.png)

The following example converts this:

```json
{
  "_links": {
    "self": {
      "href": "/testing/form"
    },
    "up": {
      "href": "/testing",
      "title": "Back to testing home"
    },
    "my-form": {
      "href": "/testing/form{?startDate}{?endDate}",
      "title": "Search by date range",
      "templated": true
    }
  }
}
```

And automatically turns the templated link into a form:

![Screenshot from 0.9.1](https://github.com/evert/hal-browser/blob/master/screenshots/0.9.1-form.png)


Installation
------------

    npm install @curveball/browser


Getting started
---------------

```typescript
import { Application } from 'curveball/@core';
import browser from '@curveball/browser';

const app = new Application();
app.use(browser({});
```


### Options

The halBrowser function takes an options object, which can take the following
settings:

* `title` - Change the main title.
* `theme` - `curveball` by default, but `lfo` and `spicy-oj` are also provided.
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
app.use(browser({
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

[1]: https://github.com/curveballjs/core
[2]: https://expressjs.com/
[3]: https://koajs.com/
[4]: https://github.com/isagalaev/highlight.js/
[5]: https://github.com/evert/hal-browser-express/
