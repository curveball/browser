import { Context } from '@curveball/core';
import csvParse from 'csv-parse';
import { promisify } from 'util';
import { h } from '../util';

const parse = promisify(csvParse);

export default async function csvBody(ctx: Context, body: any) {

  let html =
`    <h2>Contents</h2>
    <table class="body-csv">
`;
  const data = await parse(body);
  let first = true;

  for (const row of <string[][]> data) {

    html += '      <tr>\n';
    for (const cell of row) {
      if (first) {
        html += `        <th>${h(cell)}</th>\n`;
      } else {
        html += `        <td>${h(cell)}</td>\n`;
      }
    }
    if (first) {
      first = false;
    }
    html += '      </tr>\n';

  }

  html += '    </table>\n';
  return html;

}
