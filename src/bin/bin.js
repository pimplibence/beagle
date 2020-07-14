#!/usr/bin/env node

const yargs = require('yargs');
const start = require('./commands/start').Start;

yargs
    .command('start', 'Start Application', (args) => start.run(args))
    .command('start-headless', 'Start Application Headless', (args) => start.runHeadless(args))
    .command('script', 'Run Application Script', (args) => start.runScript(args));

yargs
    .options('c', {
        alias: 'config',
        default: './config.json',
        describe: 'Specify custom config.json path',
        type: 'string'
    });

// tslint:disable-next-line
yargs.argv;
