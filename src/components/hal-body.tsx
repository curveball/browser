import * as React from 'react';
import { PageProps } from '../types';

import JsonViewer from './json-viewer';

export function HalBody(props: PageProps) {

  const body = props.originalBody;

  return <>
    <h2>Contents</h2>
    <code className="hljs"><JsonViewer data={body} /></code>
  </>;

}
