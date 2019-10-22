import { Link, SureOptions } from '../../types';
import { h } from '../../util';

type Field = {
  label: string,
  value: string,
  name: string
};

export default function parseTemplatedLinks(links: Link[], options: SureOptions): string {

  let formHtml = '';

  for (const link of links) {

    if (options.hiddenRels.includes(link.rel) || link.rel in options.navigationLinks) {
      continue;
    }

    // We're only interested in templated links
    if (!link.templated) {
      continue;
    }

    const fields: Field[] = [];
    const hiddenFields: Field[] = [];

    // We only support 2 styles of templated links:
    //
    // https://foo/{?a}{?b}
    //
    // and
    //
    // https://foo/?foo={bar}
    //
    // More formats might be added if they are requested.

    // This regex finds blocks like {?foo}
    const reg = /{\?[A-Za-z]+}/g;

    const matches = link.href.match(reg);
    if (matches) {
      for (const match of matches) {
        // Stripping off {? and }
        fields.push({
          name: match.slice(2, -1),
          value: '',
          label: match.slice(2, -1),
        });
      }
    }

    // Removing {?foo} blocks.
    const [target, querystring] = link.href.replace(reg, '').split('?');

    if (target.indexOf('{') !== -1) {
      // We don't support expressions in the path/hostname part of the uri
      continue;
    }

    if (querystring) {
      for (const qsPart of querystring.split('&')) {

        const [field, value] = qsPart.split('=');
        if (value.match(/{.*}$/)) {
          fields.push({
            name: field,
            value: '',
            label: value.slice(1, -1),
          });
        } else {
          hiddenFields.push({
            name: field,
            value: decodeURIComponent(value),
            label: '',
          });
        }

      }
    }
    const title = link.title || link.rel;

    let html =
`<form method="GET" action="${h(target)}" class="long-form">
  <h3>${h(title)}</h3>
`;
    for (const field of hiddenFields) {
      html += `<input type="hidden" name="${h(field.name)}" value="${h(field.value)}" />`;
    }

    for (const field of fields) {
      html += `<label>${h(field.label)}</label><input type="text" name="${h(field.name)}" />`;
    }

    html += '<button type="submit">Submit</button>';
    html += '</form>';

    formHtml += html;
    link.rendered = true;

  }

  if (!formHtml) {
    // No links
    return '';
  }

  return formHtml;

}
