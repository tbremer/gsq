#!/usr/bin/env node
import {resolve} from 'path';
import {readFileSync as readFile, writeFileSync as writeFile} from 'fs';
import {spawn} from 'child_process';
import chalk from 'chalk';

const log = console.log; // eslint-disable-line
const message = chalk.magenta;
const error = chalk.red;
const orignalDirectory = process.cwd();
const moduleDir = resolve(__dirname, '../');
const blackFlag = [ '.DS_Store', '.bin*', '.git*', '.gitignore', 'LICENSE', 'htdocs*', 'node_modules*', 'lib*', 'package.json' ].map(f => `--exclude ${f}`);

/**
 * CHANGE DIRECTORY TO THE MODULE'S PATH.
 */
process.chdir(moduleDir);

let packager = `-r ${orignalDirectory}/scaffold.zip ./ ${blackFlag.join(' ')}`,
packagerErr = '';

let runPackager = spawn('zip', packager.split(' '));

log(message('Packing Files…'));

runPackager.stderr.on('data', data => {
  packagerErr += data.toString();
});

runPackager.on('close', () => {
  if (packagerErr.length) { return log(error('ERROR:', packagerErr)); }

  /**
   * CHANGE THE DIRECTORY BACK
   */
  process.chdir(orignalDirectory);

  log(message('Unpacking Files…'));

  let opener = `-n ${process.cwd()}/scaffold.zip -d ${process.cwd()}`;
  let runOpener = spawn('unzip', opener.split(' ')),
  openErr = '';

  runOpener.stderr.on('data', data => {
    openErr += data.toString();
  });

  runOpener.on('close', () => {
    if (openErr.length) { return log(error('ERROR:', openErr)); }

    log(message('Installing dependencies…'));
    spawn('rm', `${process.cwd()}/scaffold.zip`.split(' '));
    writeFile(`${process.cwd()}/package.json`, readFile(`${moduleDir}/lib/package-template.json`).toString());

    let install = spawn('npm', 'install'.split(' '), {stdio: 'inherit'});

    install.on('close', () => {
      log(message(chalk.bold('Install complete:'), '\n', 'Please run `npm run watch:start` to develop with server on'));
    });
  });
});
