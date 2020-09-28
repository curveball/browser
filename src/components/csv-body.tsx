import React from 'react';
import csvParse from 'csv-parse/lib/sync';
import { PageProps } from '../types';

export function CsvBody(props: PageProps) {

  const data: string[][] = csvParse(props.resourceState.data);

  const table = [];
  let first = true;

  for (const row of data) {

    const cells = [];
    for (const cell of row) {
      if (first) {
        cells.push(<th>{cell}</th>);
      } else {
        cells.push(<td>{cell}</td>);
      }
    }
    table.push(<tr>{cells}</tr>);
    first = false;

  }

  return <>
    <h2>Contents</h2>
    <table className="body-csv">
      { table }
    </table>
  </>;

}
