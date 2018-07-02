HAL browser
===========

This package provides a middleware for HAL APIs.

The middleware looks for HAL and JSON responses, and automatically converts
them into a HTML interface if a browser access them.

It does so via the `Accept: text/html` header. If this header is not provides,
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

...

API
---

[1]: https://github.com/expressjs/core
[2]: https://expressjs.com/
[3]: https://koajs.com/
