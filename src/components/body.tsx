import * as React from 'react';
import { PageProps } from '../types.js';
import { MarkdownBody } from './markdown-body.js';
import { CsvBody } from './csv-body.js';
import { HalBody } from './hal-body.js';

export function Body(props: PageProps) {

  if (!props.resourceState.data) {
    // Ignore empty bodies
    return null;
  }

  const contentType = props.resourceState.contentHeaders().get('Content-Type');

  switch (contentType) {

    case 'application/json' :
    case 'application/problem+json' :
    case 'application/hal+json' :
    case 'application/schema+json' :
    case 'application/vnd.siren+json' :
      return <HalBody {...props} />;

    case 'text/markdown' :
      return <MarkdownBody {...props} />;

    case 'text/csv' :
      return <CsvBody {...props} />;

    default:
      return null;

  }

}
