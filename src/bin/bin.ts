import * as yargs from 'yargs';
import { Start } from './commands/start';

yargs
    .command('start', 'Start Application', (args) => Start.run(args))
    .command('start-headless', 'Start Application Headless', (args) => Start.runHeadless(args))
    .command('script', 'Run Application Script', (args) => Start.runScript(args));

yargs
    .options('c', {
        alias: 'config',
        default: './config.json',
        describe: 'Specify custom config.json path',
        type: 'string'
    });

// tslint:disable-next-line
yargs.argv;
