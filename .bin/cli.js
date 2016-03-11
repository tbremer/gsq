#!/usr/bin/env node
'use strict';

var _path = require('path');

var _child_process = require('child_process');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log,
    message = _chalk2.default.magenta,
    error = _chalk2.default.red;

var orignalDirectory = process.cwd(),
    moduleDir = (0, _path.resolve)(__dirname, '../'),
    blackFlag = ['.DS_Store', '.bin*', '.git*', '.gitignore', 'LICENSE', 'htdocs*', 'node_modules*'].map(function (f) {
  return '--exclude ' + f;
});

/**
 * CHANGE DIRECTORY TO THE MODULE'S PATH.
 */
process.chdir(moduleDir);

var packager = '-r ' + orignalDirectory + '/scaffold.zip ./ ' + blackFlag.join(' '),
    packagerErr = '';

var runPackager = (0, _child_process.spawn)('zip', packager.split(' '));

log(message('Packing Files…'));

runPackager.stderr.on('data', function (data) {
  packagerErr += data.toString();
});

runPackager.on('close', function (code) {
  if (packagerErr.length) {
    return log(error('ERROR:', packagerErr));
  }

  /**
   * CHANGE THE DIRECTORY BACK
   */
  process.chdir(orignalDirectory);

  log(message('Unpacking Files…'));

  var opener = '-n ' + process.cwd() + '/scaffold.zip -d ' + process.cwd();
  var runOpener = (0, _child_process.spawn)('unzip', opener.split(' ')),
      openErr = '';

  runOpener.stderr.on('data', function (data) {
    openErr += data.toString();
  });

  runOpener.on('close', function (code) {
    if (openErr.length) {
      return log(error('ERROR:', openErr));
    }

    log(message('Installing dependencies…'));
    (0, _child_process.spawn)('rm', (process.cwd() + '/scaffold.zip').split(' '));

    var install = (0, _child_process.spawn)('npm', 'install'.split(' '), { stdio: 'inherit' });

    install.on('close', function () {
      log(message(_chalk2.default.bold('Install complete:'), '\n', 'Please run `npm run watch:start` to develop with server on'));
    });
  });
});
