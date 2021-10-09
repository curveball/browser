import * as React from 'react';
import { PageProps } from '../../types';
import { Button } from './button';
import { getFieldsFromTemplatedUri } from '../../util';

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

    const fieldData = getFieldsFromTemplatedUri(link.href);
    if (!fieldData) {
      // Unparsable
      continue;
    }
    const [target, hiddenFields, fields] = fieldData;
    const title = link.title || link.rel;

    result.push(<form method="GET" action={target} className="long-form">
      <h3 key="h3">{title}</h3>

      {Object.entries(hiddenFields).map( ([field, value]) =>
        <input type="hidden" name={field} value={value} key={field + '-' + value}/>
      )}
      {fields.map( field =>
        <React.Fragment key={field + '-' + field}><label>{field}</label><input type="text" name={field} /></React.Fragment>
      )}
      <div className="buttonRow"><Button method="GET" /></div>
    </form>);

    (link as any).rendered = true;

  }

  return result;

}
