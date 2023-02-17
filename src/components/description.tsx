import * as React from 'react';
import { PageProps } from '../types.js';

export function Description(props: PageProps) {

  if (props.resourceState.data.description && typeof props.resourceState.data.description === 'string') {
    return <p>{props.resourceState.data.description}</p>;
  } else {
    return null;
  }

}
