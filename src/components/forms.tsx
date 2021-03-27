import * as React from 'react';
import { PageProps } from '../types';
import { TemplatedLinks } from './forms/templated-links';
import { ActionForm } from './forms/ketting-action';
import { ButtonForm } from './forms/ketting-action-button';

export function Forms(props: PageProps) {

  const forms = TemplatedLinks(props);
  const buttonForms = [];

  for(const action of props.resourceState.actions()) {

    // Some actions can be expressed as a single button, instaed of a full form.
    if (action.fields.some( field => field.type !== 'hidden')) {
      forms.push(<ActionForm action={action} csrfToken={props.csrfToken}/>);
    } else {
      buttonForms.push(<ButtonForm action={action} csrfToken={props.csrfToken} />);
    }

  }

  if (!forms.length && !buttonForms.length) {
    return null;
  }

  /*
  if (Object.keys(props.resourceState.data).length === 0 && forms.length === 1) {
    // If there are 0 data properties, and exactly 1 action we render a page more
    // focused on the single form. We skip the 'forms' header and just the form
    // title instead.
  }*/

  return <>
    <h2 key="-1">Actions</h2>
    {buttonForms.map( (form, index) => <span key={index}>{form}</span>)}
    {forms.map( (form, index) => <span key={index}>{form}</span>)}
  </>;

}
