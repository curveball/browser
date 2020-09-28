import React from 'react';
import { PageProps } from '../types';
import { highlightJson } from '../util';

export function HalBody(props: PageProps) {

  const tmpBody = Object.assign({}, props.resourceState.data);

  if (!props.options.fullBody) {
    delete tmpBody._links;
    delete tmpBody._embedded;
  }

  const html = {
    __html: highlightJson(tmpBody)
  };

  return <>
    <h2>Contents</h2>
    <code className="hljs"><pre dangerouslySetInnerHTML={html}></pre></code>
  </>;

}
