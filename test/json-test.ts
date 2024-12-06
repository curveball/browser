import { Application } from '@curveball/kernel';
import browser from '../src/index.js';
import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

describe('Browser middleware integration test', () => {

  it('should render a HTML page when an `Accept` header with text/html is emitted', async() => {

    const app = new Application();
    const mw = browser();
    app.use(mw);

    app.use( ctx => {
      ctx.response.body = { hello: 'world' };
      ctx.response.type = 'application/json';
    });

    const resp = await app.subRequest('GET', '/', {
      Accept: 'text/html'
    });

    assert.equal(resp.status, 200);
    assert.ok(resp.is('html'));
    assert.ok(resp.body.includes('<html><head>'));

  });

});
