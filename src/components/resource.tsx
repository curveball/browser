import * as React from 'react';

import { Body } from './body';
import { Embedded } from './embedded';
import { Forms } from './forms';
import { LinksTable } from './links-table';
import { PageProps } from '../types';
import { Pager } from './pager';
import { ResourceMetaData } from './resource-metadata';

export function Resource(props: PageProps) {

  return <>
    <LinksTable {...props} />
    <Forms {...props} />
    <Body {...props} />
    <Pager {...props} />
    <Embedded {...props} />
    <Pager {...props} />
    <ResourceMetaData {...props} />
  </>;

}
