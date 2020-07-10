import * as yargs from 'yargs';
import { Start } from './commands/start';

yargs
    .command('start', 'Start Application with', (args) => Start.run(args))
    .options('c', {
        alias: 'config',
        default: './config.json',
        describe: 'Specify custom config.json path',
        type: 'string'
    });

yargs.argv;
