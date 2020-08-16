import { State } from 'ketting';
import hljs from 'highlight.js';
import md from 'markdown-it';

export default function markdownBody(state: State) {

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
  }).render(state.data);

  html += '</section>';
  return html;

}
