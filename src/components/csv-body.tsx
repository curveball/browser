import * as React from 'react';
import { parse } from 'csv-parse/sync';
import { PageProps } from '../types.js';

export function CsvBody(props: PageProps) {

  const data: string[][] = parse(props.resourceState.data);

  const table = [];
  let first = true;

  let rowId=0;

  for (const row of data) {

    rowId++;
    let colId = 0;

    const cells = [];
    for (const cell of row) {

      colId++;
      if (first) {
        cells.push(<th key={colId}>{cell}</th>);
      } else {
        cells.push(<td key={colId}>{cell}</td>);
      }
    }
    table.push(<tr key={rowId}>{cells}</tr>);
    first = false;

  }

  return <>
    <h2>Contents</h2>
    <div className="body-csv">
      <table>
        { table }
      </table>
    </div>
  </>;

}
