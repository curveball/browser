import { getFieldsFromTemplatedUri } from '../src/util.js';
import { expect } from 'chai';

describe('Templated URI parser', () => {

  const tests: any = [
    [
      'http://example',
      ['http://example', {}, []]
    ],
    [
      'http://example?foo=bar',
      ['http://example', {foo: 'bar'}, []]
    ],
    [
      'http://example{?foo}',
      ['http://example', {}, ['foo']]
    ],
    [
      'http://example{?foo,bar}',
      ['http://example', {}, ['foo', 'bar']]
    ],
    [
      'http://example?foo=1{&bar}',
      ['http://example', {foo: '1'}, ['bar']]
    ],
    [
      'http://example?foo=1{&bar,baz}',
      ['http://example', {foo: '1'}, ['bar', 'baz']]
    ],
    [
      'http://example?foo=1{&bar,baz}&zim=2',
      ['http://example', {foo: '1', zim: '2'}, ['bar', 'baz']]
    ],
    [
      'http://example/?foo=1{&bar,baz}&zim=2&fizz',
      ['http://example/', {foo: '1', zim: '2', 'fizz': ''}, ['bar', 'baz']]
    ],
    [
      'http://{host}/blabla',
      null,
    ],
    [
      'http://example/?foo={foo}&bar={bar}',
      ['http://example/', {}, ['foo', 'bar']]
    ]
  ];

  for(const [input, expected] of tests) {

    it(`should correctly parse "${input}"`, () => {

      expect(getFieldsFromTemplatedUri(input)).to.eql(expected);

    });

  }

});
