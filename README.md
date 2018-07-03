HAL browser
===========

This package provides a middleware for HAL APIs.

The middleware looks for HAL and JSON responses, and automatically converts
them into a HTML interface if a browser access them.

It does so via the `Accept: text/html` header. If this header is not provided,
the middleware does nothing.

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
  stylesheets: [
    // path to CSS stylesheets
  ],
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

API
---

[1]: https://github.com/expressjs/core
[2]: https://expressjs.com/
[3]: https://koajs.com/
[4]: https://github.com/isagalaev/highlight.js/
