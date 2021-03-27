import * as React from 'react';

type Props = {
  method: string;
  title?: string|null;
}

const methodLabel: Record<string, string> = {
  'DELETE': 'Delete',
  'GET': 'Query',
  'PATCH' : 'Update',
  'SEARCH' : 'Search',
};


export function Button(props: Props) {

  const label = props.title || methodLabel[props.method] || 'Submit';
  return <button type="submit" className={'method-' + props.method.toLowerCase()}>{label}</button>;

}
