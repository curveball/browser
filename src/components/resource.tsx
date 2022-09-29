import * as React from 'react';

import { Description } from './description';
import { PageProps } from '../types';
import { Embedded } from './embedded';
import { Forms } from './forms';
import { LinksTable } from './links-table';
import { Pager } from './pager';
import { Body } from './body';

export function Resource(props: PageProps) {

  return <>
    <Description {...props} />
    <LinksTable {...props} />
    <Forms {...props} />
    <Body {...props} />
    <Embedded {...props} />
    <Pager {...props} />
  </>;

}
