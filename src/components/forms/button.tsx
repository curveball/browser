import * as React from 'react';

type Props = {
  method: string;
  title?: string|null;
  titleHint?: string;
}

const methodLabel: Record<string, string> = {
  'DELETE': 'Delete',
  'GET': 'Query',
  'PATCH' : 'Update',
  'SEARCH' : 'Search',
};

const titleHintGuess: Record<string, string> = {
  'add': 'Add',
  'edit': 'Edit',
};

export function Button(props: Props) {

  const label = props.title || guessTitle(props.titleHint) || methodLabel[props.method] || 'Submit';

  return <button type="submit" className={'method-' + props.method.toLowerCase()}>
    {label}
  </button>;

}

function guessTitle(titleHint: string|undefined): string|undefined {

  if (!titleHint) return;
  const firstWord = titleHint.split(' ')[0].toLowerCase();
  return titleHintGuess[firstWord];

}
