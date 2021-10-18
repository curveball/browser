import * as React from 'react';
import hljs from 'highlight.js';
import * as md from 'markdown-it';
import { PageProps } from '../types';

export function MarkdownBody(props: PageProps) {

  const html = {
    __html: md({
      html: true,
      xhtmlOut: true,
      highlight: (str: string, lang: string) => {

        if (lang && hljs.getLanguage(lang)) {
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
