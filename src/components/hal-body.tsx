import * as React from 'react';
import { PageProps, JsonSchema } from '../types.js';

import JsonViewer from './json-viewer.js';

export function HalBody(props: PageProps) {

  const body = props.originalBody;
  let schema: JsonSchema|null = null;

  const describedBy = props.resourceState.links.get('describedby');
  if (describedBy && describedBy.type === 'application/schema+json') {
    schema = props.jsonSchemas.get(describedBy.href) ?? null;
  }

  return <>
    <h2>Contents</h2>
    <code className="hljs"><JsonViewer data={body} schema={schema} /></code>
  </>;

}
