import * as React from 'react';

import { Description } from './description.js';
import { PageProps } from '../types.js';
import { Embedded } from './embedded.js';
import { Forms } from './forms.js';
import { LinksTable } from './links-table.js';
import { Pager } from './pager.js';
import { Body } from './body.js';

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
