import React from 'react';
import { PageProps } from '../types';
import { HalForm } from './forms/hal-forms';
import { TemplatedLinks } from './forms/templated-links';

export function Forms(props: PageProps) {

  const forms = TemplatedLinks(props);
  if (props.resourceState.contentHeaders().get('Content-Type') === 'application/prs.hal-forms+json') {
    const hf = HalForm(props);
    if (hf) {
      forms.push(hf);
    }
  }

  if (!forms) {
    return null;
  }
 
  return <>
    <h2>Forms</h2>
    {forms}
  </>;

}
