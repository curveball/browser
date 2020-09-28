import React from 'react';
import { h } from '../../util';
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

type HalForm = {
  method: string,
  properties: HalFormProperty[],
  title?: string
};

export function HalForm(props: PageProps) {

  const body = props.resourceState.data;
  if (!body?._templates?.default) {
    return null;
  }
  const form:HalForm = body._templates.default;
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

export default function parseHalForms(target: string, body: { [s: string]: any }): string {

  const form: HalForm = body._templates.default;

  let html =
`<form method="${h(form.method.toUpperCase())}" action="${h(target)}" class="long-form">
  <h3>${h(form.title)}</h3>
`;

  for (const property of form.properties) {

    html += `
<label>${h(property.prompt || property.name)}</label>
<input
  type="text" name="${h(property.name)}"
  ${property.readOnly ? 'readonly="readonly" ' : ''}
  ${property.regex ? 'pattern="' + h(property.regex) + '"' : ''}
  ${property.required ? 'required="required" ' : ''}
  ${property.value ? 'value="' + h(property.value) + '"' : ''}
/>
    `;

  }

  html += '<button type="submit">Submit</button>';
  html += '</form>';

  return html;


}
