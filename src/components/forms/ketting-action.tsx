import * as React from 'react';
import { useId } from 'react';
import { Action, Field } from 'ketting';
import { Button } from './button';

type FormProps = {
  csrfToken: string | null;
  action: Action;
}
type FieldProps = {
  field: Field;
}

export function ActionForm(props: FormProps) {

  const action = props.action;
  return <form action={action.uri} method={action.method} encType={action.contentType} id={action.name!} className="long-form">
    <h3>{action.title || action.name || 'form'}</h3>

    {props.csrfToken ? <input type="hidden" name="csrf-token" defaultValue={props.csrfToken} /> : ''}
    {action.fields.map( field => <ActionField field={field} key={field.name} />) }

    <div className="buttonRow"><Button method={action.method} titleHint={action.title} /></div>
  </form>;

}

export function ActionField(props: FieldProps): React.ReactElement {

  const id = useId();
  let input;
  let renderLabel = true;

  const field = props.field;

  field.type;

  switch(field.type) {

    case 'checkbox' :
    case 'radio' :
      input =
        <div className="checkboxes">
          <input
            id={`${field.name}-${id}`}
            type={field.type}
            name={field.name}
            defaultValue={field.value?.toString()}
            defaultChecked={field.value}
            readOnly={field.readOnly} />
          <label htmlFor={`${field.name}-${id}`}>{field.label || field.name}</label>
        </div>;
      renderLabel = false;
      break;
    case 'color' :
    case 'email' :
    case 'file' :
    case 'password' :
    case 'search' :
    case 'tel' :
    case 'url' :
      input = <input
        id={`${field.name}-${id}`}
        name={field.name}
        type={field.type}
        placeholder={field.placeholder?.toString()}
        defaultValue={field.value?.toString()}
        required={field.required}
        readOnly={field.readOnly}
      />;
      break;
    case 'hidden' :
      input = <input
        name={field.name}
        type={field.type}
        defaultValue={field.value?.toString()}
      />;
      renderLabel = false;
      break;
    case 'date' :
    case 'datetime' :
    case 'datetime-local' :
    case 'number' :
    case 'month' :
    case 'range' :
    case 'time' :
    case 'week' : {
      let value;
      if (field.value instanceof Date) {
        value = field.value.toISOString().slice(0, -1);
      } else {
        value = field.value?.toString();
      }
      input = <input
        id={`${field.name}-${id}`}
        name={field.name}
        type={field.type}
        placeholder={field.placeholder?.toString()}
        defaultValue={value}
        required={field.required}
        max={field.max}
        min={field.min}
        step={field.step}
        readOnly={field.readOnly}
      />;
      break;
    }
    case 'text' :
      input = <input
        id={`${field.name}-${id}`}
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
        id={`${field.name}-${id}`}
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
    case 'select' : {

      let options: Record<string, string>;
      if ((field as any).options) {
        options = (field as any).options;
      } else {
        options = { 'n/a': 'Not yet supported' };
      }

      switch(field.renderAs) {
        case 'dropdown' :
        default :
          input = <select
            id={`${field.name}-${id}`}
            name={field.name}
            multiple={field.multiple}
            defaultValue={field.value}>
            {Object.entries(options).map( ([k, v]) => <option value={k} key={k}>{v}</option> ) }
          </select>;
          break;
        case 'radio' :
        case 'checkbox' : {
          const inputs = [];
          for(const [k, v] of Object.entries(options)) {
            inputs.push(
              <div className="checkboxes">
                <input
                  id={field.name + '-' + k}
                  type={field.type}
                  name={field.name}
                  defaultValue={v}
                  defaultChecked={field.value?.includes(k)} />
                <label htmlFor={field.name + '-' + k}>{v}</label>
              </div>
            );
            break;

          }
          renderLabel = false;
          input = <>{inputs}</>;
        }
      }
      break;
    }
    default:
      ((x: never) => {
        throw new Error(`${(x as any).type} was unhandled!`);
      })(field);

  }

  if (!renderLabel) {
    return input;
  }

  return <>
    <label htmlFor={`${field.name}-${id}`}>{field.label || field.name}</label>
    {input}
  </>;

}
