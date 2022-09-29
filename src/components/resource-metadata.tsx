import * as React from 'react';

import { PageProps } from '../types';

export function ResourceMetaData(props: PageProps) {

  return <>
    <h2>Resource metadata</h2>
    <p>Allowed methods:
      <span className="link-badge method-get">GET</span>
      <span className="link-badge method-put">PUT</span>
      <span className="link-badge method-delete">DELETE</span>
    </p>
  </>;

}
