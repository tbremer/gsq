'use strict';

/*eslint no-console:0*/

import {watch} from 'fs';
import {spawn as run} from 'child_process';
import chalk from 'chalk';

const buildWatcher = watch(`${process.env.PWD}/src/`, {recursive: true}),
log = console.log,
error = chalk.bold.red,
html = chalk.magenta;

buildWatcher.on('change', (event, fileName) => {
  if (!/\.html$/.test(fileName)) return;

  log(html('File Changed:'), fileName);

  let builder = run('npm', 'run build:html'.split(' ')),
  err = '';

  builder.stdout.on('data', (data) => {
    data = data.toString().replace(/>[\S\s]+>/, '').trim();

    log(html('Command Ran: '), data);
    log();
  });

  builder.stderr.on('data', (data) => { err += data; });
  builder.stderr.on('close', () => {
    err = err.toString().replace(/npm[\s\S]+$/g, '').replace(new RegExp(`${process.env.PWD}/`), '').trim();

    if (!err) return;

    log(error('CSS Build Error:'));
    log(err);
    log();
  });
});
