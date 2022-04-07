import * as React from 'react';
import { PageProps } from '../types';

import JsonViewer from './json-viewer';

export function HalBody(props: PageProps) {

  const tmpBody = props.resourceState.serializeBody() as string;

  if (Object.keys(tmpBody).length === 0) {
    return <></>;
  }

  return <>
    <h2>Contents</h2>
    <code className="hljs"><JsonViewer data={tmpBody} /></code>
  </>;

}
