import hljs from 'highlight.js';
import md from 'markdown-it';
import { Context } from '@curveball/core';

export default function markdownBody(ctx: Context) {

  let html = '<section class="body-markdown">';
  html += md({
    xhtmlOut: true,
    highlight: (str: string, lang: string) => {

      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value;
      }
      // use external default escaping
      return '';

    }
  }).render(ctx.response.body);

  html += '</section>';
  return html;

}
