import * as React from 'react';
import { PageProps } from '../types';
import { Resource } from './resource';

export function Embedded(props: PageProps) {

  const embeds = props.resourceState.getEmbedded();
  if (!embeds.length) return null;

  const {
    // The purpose of these two is just to remove them from embeddedProps
    resourceState,
    originalBody,

    ...embeddedProps
  } = props;

  return <>
    <h2>Embedded</h2>
    { embeds.map( embeddedState => <Embed
      resourceState={embeddedState}
      originalBody={embeddedState.serializeBody() as string}
      key={embeddedState.uri}
      {...embeddedProps}
    />) }
  </>;

}

function Embed(props: PageProps) {

  const selfLink = props.resourceState.links.get('self')!;

  return <details>
    <summary>{selfLink.href}</summary>
    <Resource {...props} />
  </details>;

}
