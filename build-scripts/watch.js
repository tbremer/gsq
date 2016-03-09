import {spawn as run} from 'child_process';

run('npm', 'run watch:js'.split(' '), {stdio: 'inherit'});
run('npm', 'run watch:css'.split(' '), {stdio: 'inherit'});
run('npm', 'run watch:html'.split(' '), {stdio: 'inherit'});
