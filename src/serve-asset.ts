import { Context } from '@curveball/core';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const realpath = promisify(fs.realpath);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

/**
 * If enabled, this function will serve asset files automatically.
 */
export default async function serveAsset(ctx: Context) {

  const baseUrl = '/_hal-browser/assets/';
  const basePath = await realpath(__dirname + '/../assets');

  const fileName = path.join(
    basePath,
    ctx.request.path.substr(baseUrl.length)
  );

  if (!path.isAbsolute(fileName)) {
    throw new Error('Invalid path');
  }

  const fileStat: fs.Stats = await stat(fileName);

  if (!fileStat.isFile()) {
    throw new Error('Invalid path');
  }

  const fileParts = path.parse(fileName);

  ctx.response.body = await readFile(fileName);
  ctx.response.headers.set('Content-Length', ctx.response.body.length);

  switch (fileParts.ext) {
    case '.svg' :
      ctx.response.type = 'image/svg';
      break;
    case '.css' :
      ctx.response.type = 'text/css';
      break;
  }

}
