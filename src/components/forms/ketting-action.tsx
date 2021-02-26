import * as React from 'react';
import { Action, Field } from 'ketting';

type FormProps = {
  csrfToken: string | null,
  action: Action
}
type FieldProps = {
  field: Field,
}

export function ActionForm(props: FormProps) {

  const action = props.action;
  return <form action={action.uri} method={action.method} encType={action.contentType} id={action.name!} className="long-form">
    <h3>{action.title || action.name || 'form'}</h3>

    {props.csrfToken ? <input type="hidden" name="csrf-token" defaultValue={props.csrfToken} /> : ''}
    {action.fields.map( field => <ActionField field={field} key={field.name} />) }

    <button type="submit">Submit</button>
  </form>;

}

export function ActionField(props: FieldProps): React.ReactElement {

  let input;

  const field = props.field;
  switch(field.type) {

    case 'checkbox' :
    case 'radio' :
      input =
        <div className="checkboxes">
          <input
            type={field.type}
            name={field.name}
            defaultValue={field.value?.toString()}
            defaultChecked={field.value}
            readOnly={field.readOnly} />
          <label htmlFor={field.name}>{field.label || field.name}</label>
        </div>;
      break;
    case 'color' :
    case 'date' :
    case 'datetime' :
    case 'datetime-local' :
    case 'email' :
    case 'file' :
    case 'hidden' :
    case 'month' :
    case 'password' :
    case 'search' :
    case 'tel' :
    case 'time' :
    case 'url' :
    case 'week' :
      input = <input
        name={field.name}
        type={field.type}
        placeholder={field.placeholder?.toString()}
        defaultValue={field.value?.toString()}
        required={field.required}
        readOnly={field.readOnly}
      />;
      break;
    case 'number' :
    case 'range' :
      input = <input
        name={field.name}
        type={field.type}
        placeholder={field.placeholder?.toString()}
        defaultValue={field.value}
        required={field.required}
        max={field.max}
        min={field.min}
        step={field.step}
        readOnly={field.readOnly}
      />;
      break;
    case 'text' :
      input = <input
        name={field.name}
        type={field.type}
        pattern={field.pattern?.toString().slice(1,-1)}
        placeholder={field.placeholder}
        defaultValue={field.value}
        minLength={field.minLength}
        maxLength={field.maxLength}
        required={field.required}
        readOnly={field.readOnly}
      />;
      break;
    case 'textarea' :
      input = <textarea
        name={field.name}
        placeholder={field.placeholder}
        defaultValue={field.value}
        minLength={field.minLength}
        maxLength={field.maxLength}
        required={field.required}
        readOnly={field.readOnly}
        cols={field.cols}
        rows={field.rows}
      />;
      break;
    case 'select' :
      input = <select disabled={true}><option>Not yet supported</option></select>;
      break;
    default:
      ((x: never) => {
        throw new Error(`${(x as any).type} was unhandled!`);
      })(field);

  }

  // These elements render their own labels (or don't require them)
  if (['hidden', 'radio', 'checkbox'].includes(field.type)) {
    return input;
  }

  return <>
    <label htmlFor={field.name}>{field.label || field.name}</label>
    {input}
  </>;

}
