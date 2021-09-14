import * as React from 'react';
import * as hljs from 'highlight.js';
import * as md from 'markdown-it';
import { PageProps } from '../types';

export function MarkdownBody(props: PageProps) {

  const html = {
    __html: md({
      html: true,
      xhtmlOut: true,
      highlight: (str: string, lang: string) => {

        // @ts-expect-error highlight.js has broken types as of v11.2.0
        if (lang && hljs.getLanguage(lang)) {
          // @ts-expect-error highlight.js has broken types as of v11.2.0
          return hljs.highlight(lang, str).value;
        }
        // use external default escaping
        return '';

      }
    }).render(props.resourceState.data)
  };

  return <section className="body-markdown" dangerouslySetInnerHTML={html} >
  </section>;

}
