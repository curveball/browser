import csvParse from 'csv-parse';
import { promisify } from 'util';
import { h } from '../util';

const parse = promisify(csvParse);

export default async function csvBody(body: any) {

  let html =
`    <h2>Contents</h2>
    <table class="body-csv">
`;

  const data = await parse(body);
  for (const row of <string[][]> data) {

    html += '      <tr>\n';
    for (const cell of row) {
      html += `        <td>${h(cell)}</td>\n`;
    }
    html += '      </tr>\n';

  }

  html += '    </table>\n';
  return html;

}
