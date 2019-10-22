import { h } from '../../util';

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

export default function parseHalForms(target: string, body: { [s: string]: any }): string {

  if (body._templates === undefined) {
    return '';
  }

  if (body._templates.default === undefined) {
    return '';
  }

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
