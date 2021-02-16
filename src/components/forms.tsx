import * as React from 'react';
import { PageProps } from '../types';
import { TemplatedLinks } from './forms/templated-links';
import { ActionForm } from './forms/ketting-action';

export function Forms(props: PageProps) {

  const forms = TemplatedLinks(props);
  const actions = props.resourceState.actions()
    .map( action => <ActionForm action={action} csrfToken={props.csrfToken}/>);
  forms.push(...actions);

  if (!forms.length) {
    return null;
  }

  if (Object.keys(props.resourceState.data).length === 0 && forms.length === 1) {
    // If there are 0 data properties, and exactly 1 action we render a page more
    // focused on the single form. We skip the 'forms' header and just the form
    // title instead.
  }

  return <>
    <h2 key="-1">Forms</h2>
    {forms.map( (form, index) => <span key={index}>{form}</span>)}
  </>;

}
