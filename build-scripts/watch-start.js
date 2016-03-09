import {spawn as run} from 'child_process';

run('npm', 'run watch'.split(' '), {stdio: 'inherit'});
run('npm', 'run start'.split(' '), {stdio: 'inherit'});
