import * as React from 'react';
import { PageProps } from '../types';
import { highlightJson } from '../util';

export function HalBody(props: PageProps) {

  let tmpBody = Object.assign({}, props.resourceState.data);

  if (props.options.fullBody) {
    tmpBody = JSON.parse(props.resourceState.serializeBody() as string);
  }

  const html = {
    __html: highlightJson(tmpBody)
  };

  return <>
    <h2>Contents</h2>
    <code className="hljs"><pre dangerouslySetInnerHTML={html}></pre></code>
  </>;

}
