import * as React from 'react';
import { PageProps } from '../../types';
import { Button } from './button';

type Field = {
  label: string,
  value: string,
  name: string
};

export function TemplatedLinks(props: PageProps) {

  const result = [];
  for (const link of props.resourceState.links.getAll()) {

    if (props.options.hiddenRels.includes(link.rel) || link.rel in props.options.navigationLinks) {
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
    const reg = /{\?[A-Za-z,]+}/g;

    const matches = link.href.match(reg);
    if (matches) {
      for (const match of matches) {
        // Stripping off {? and }
        const fieldNames = match.slice(2, -1);

        // Splitting at ','
        for (const fieldName of fieldNames.split(',')) {
          fields.push({
            name: fieldName,
            value: '',
            label: fieldName,
          });
        }
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

    result.push(<form method="GET" action={target} className="long-form">
      <h3 key="h3">{title}</h3>

      {hiddenFields.map( field =>
        <input type="hidden" name={field.name} value={field.value} key={field.name + '-' + field.value}/>
      )}
      {fields.map( field =>
        <React.Fragment key={field.label + '-' + field.name}><label>{field.label}</label><input type="text" name={field.name} /></React.Fragment>
      )}
      <div className="buttonRow"><Button method="GET" /></div>
    </form>);

    (link as any).rendered = true;

  }

  return result;

}
