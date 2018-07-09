import md from 'markdown-it';
import hljs from 'highlight.js';

export default function markdownBody(body: any) {

  let html = '<section class="body-markdown">';
  html += md({
    xhtmlOut: true,
    highlight: function(str: string, lang: string) {

      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value;
      }
      // use external default escaping
      return '';

    }
  }).render(body);

  html+='</section>';
  return html;

}
