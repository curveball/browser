import { highlightJson } from '../util';

export default function halBody(body: any) {

  const tmpBody = Object.assign(body);
  delete tmpBody._links;

  return highlightJson(tmpBody);

}
