'use strict';

/*eslint no-console:0*/

import {watch} from 'fs';
import {spawn as run} from 'child_process';
import chalk from 'chalk';

const buildWatcher = watch(`${process.env.PWD}/src/js`, {recursive: true}),
log = console.log,
error = chalk.bold.red,
js = chalk.yellow;

buildWatcher.on('change', (event, fileName) => {
  if (!/\.js$/.test(fileName)) return;

  log(js('File Changed:'), fileName);

  let builder = run('npm', 'run build:js'.split(' ')),
  err = '';

  builder.stdout.on('data', (data) => {
    data = data.toString().replace(/>[\S\s]+>/, '').trim();

    log(js('Command Ran: '), data);
    log();
  });

  builder.stderr.on('data', (data) => { err += data; });
  builder.stderr.on('close', () => {
    err = err.toString().replace(/\S*Error:|npm[\s\S]+$/g, '').trim();

    if (!err) return;

    log(error('JS Build Error:'));
    log(err);
    log();
  });
});
