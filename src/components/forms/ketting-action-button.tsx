import * as React from 'react';
import { Action, Field } from 'ketting';
import { Button } from './button';

type FormProps = {
  csrfToken: string | null,
  action: Action
}
type FieldProps = {
  field: Field,
}

/**
 * This component renders actions that can be expressed as a single button.
 *
 * This is only the case for actions that have no fields or only fields with
 * type=hidden
 */
export function ButtonForm(props: FormProps) {

  const action = props.action;
  return <form action={action.uri} method={action.method} encType={action.contentType} id={action.name!} className="button-form">
    {props.csrfToken ? <input type="hidden" name="csrf-token" defaultValue={props.csrfToken} /> : ''}
    {action.fields.map( field => <ActionField field={field} key={field.name} />) }
    <Button method={action.method} title={action.title || action.name || null} />
  </form>;

}

function ActionField(props: FieldProps): React.ReactElement {

  const field = props.field;
  if (field.type !== 'hidden') {
    throw new Error('The ActionButtonForm can only render forms that have no fields');
  }

  return <input
    name={field.name}
    type={field.type}
    defaultValue={field.value?.toString()}
  />;

}
