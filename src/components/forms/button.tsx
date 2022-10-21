import * as React from 'react';

type Props = {
  /**
   * The HTTP method associated with this button.
   */
  method: string;

  /**
   * The label of the button. If this is not provided, we'll guess it based
   * on the HTTP method and titleHint.
   */
  title?: string|null;

  /**
   * If provided, we'll try to extract a good button label from this.
   * Currently we just look for the first word in this string and if it
   * matches a known verb we use that as the label.
   *
   * For example the titleHint might be 'Edit This User', in which case
   * the label for the button just becomes 'Edit'.
   */
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
