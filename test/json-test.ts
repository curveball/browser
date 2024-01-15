import { Application } from '@curveball/kernel';
import browser from '../src/index.js';
import { expect } from 'chai';

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

    expect(resp.status).to.equal(200);
    expect(resp.is('html')).to.equal(true);
    expect(resp.body).to.contain('<html><head>');

  });

});
