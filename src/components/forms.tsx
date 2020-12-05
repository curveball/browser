import * as React from 'react';
import { PageProps } from '../types';
import { HalForm } from './forms/hal-forms';
import { TemplatedLinks } from './forms/templated-links';
import { ActionForm } from './forms/ketting-action';

export function Forms(props: PageProps) {

  const forms = TemplatedLinks(props);
  if (props.resourceState.contentHeaders().get('Content-Type') === 'application/prs.hal-forms+json') {
    const hf = HalForm(props);
    if (hf) {
      forms.push(hf);
    }
  }

  const actions = props.resourceState.actions()
    .map( action => <ActionForm action={action} />);
  forms.push(...actions);

  if (!forms.length) {
    return null;
  }

  return <>
    <h2 key="-1">Forms</h2>
    {forms.map( (form, index) => <span key={index}>{form}</span>)}
  </>;

}
