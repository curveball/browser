import * as React from 'react';
import { PageProps } from '../../types';

type HalFormProperty = {
  name: string,
  prompt?: string,
  readOnly?: boolean,
  regex?: string,
  required?: boolean,
  templated?: boolean,
  value?: string,
};

type HalFormObj = {
  method: string,
  properties: HalFormProperty[],
  title?: string
};

export function HalForm(props: PageProps) {

  const body = props.resourceState.data;
  if (!body?._templates?.default) {
    return null;
  }
  const form:HalFormObj = body._templates.default;
  const url = new URL(props.resourceState.uri);
  const searchParams = url.searchParams;

  const target = searchParams.get('_htarget') || url.toString();

  return <form method={form.method.toUpperCase()} action={target} className="long-form">
    <h3>{form.title}</h3>

    {form.properties.map( property =>
      <>
        <label>{property.prompt || property.name}</label>
        <input
          type="text"
          name={property.name}
          readOnly={property.readOnly}
          pattern={property.regex}
          required={property.required}
          value={property.value}
        />
      </>)}
    <button type="submit">Submit</button>
  </form>;

}
