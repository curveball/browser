import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import { writeFileSync } from 'node:fs';

const response = await fetch('https://www.iana.org/assignments/link-relations/link-relations.xml');
const body = await response.text();

const dom = new JSDOM(body).window.document;

const relationships = {};

for(const record of dom.getElementsByTagName('record')) {

  const rel = record.getElementsByTagName('value')[0].textContent;
  const description = record.getElementsByTagName('description')[0].textContent
    .replace('\n     ','')
    .trim('\n').trim(' ');

  const xref = record.getElementsByTagName('xref')[0];
  const xrefType = xref.getAttribute('type');
  const xrefData = xref.getAttribute('data');

  let href;

  switch(xrefType) {

    case 'uri' :
      href = xrefData;
      break;
    case 'rfc' :
      href = 'https://datatracker.ietf.org/doc/html/' + xrefData;
      break;
    default:
      console.error('Oh no: %s', xrefType);
      break;

  }

  relationships[rel] = {
    rel,
    description,
    href,
  };

}

// console.log(relationships);
console.log(JSON.stringify(relationships, undefined, 2));
