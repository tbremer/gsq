'use strict';

/*eslint no-console:0*/

import {watch} from 'fs';
import {spawn as run} from 'child_process';
import chalk from 'chalk';

const buildWatcher = watch(`${process.env.PWD}/src/css`, {recursive: true}),
log = console.log,
error = chalk.bold.red,
css = chalk.cyan;

buildWatcher.on('change', (event, fileName) => {
  if (!/\.css$/.test(fileName)) return;

  log(css('File Changed:'), fileName);

  let builder = run('npm', 'run build:css'.split(' ')),
  err = '';

  builder.stdout.on('data', (data) => {
    data = data.toString().replace(/>[\S\s]+>/, '').trim();

    log(css('Command Ran: '), data);
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
