#!/usr/bin/env node

import { execSync } from 'child_process';
import * as hygen from 'hygen';
import { resolve } from 'path';
import * as yargs from 'yargs';
import { Generate } from './commands/generate';
import { Start } from './commands/start';

const startCommandBuilder: yargs.BuilderCallback<any, any> = (builder) => {
    builder.option('config', {
        alias: 'c',
        default: 'config',
        type: 'string',
        description: 'Config file path'
    });

    builder.option('mode', {
        alias: 'm',
        type: 'string',
        description: 'Runtime mode of Application'
    });
};

const scriptCommandBuilder: yargs.BuilderCallback<any, any> = (builder) => {
    builder.option('script', {
        describe: 'Name of registered script',
        type: 'string',
        required: true
    });

    startCommandBuilder(builder);
};

const generateCommandBuilder: yargs.BuilderCallback<any, any> = (builder) => {
    builder.option('name', {
        required: true,
        type: 'string',
        description: 'Name of object'
    });
};

yargs
    .command(
        'start',
        'Start Application',
        (builder) => startCommandBuilder(builder),
        (args) => Start.run(args)
    )
    .command(
        'script',
        'Start Script of Application',
        (builder) => scriptCommandBuilder(builder),
        (args) => Start.runScript(args)
    )
    .command(
        'generate',
        'Generate framework components',
        (builder) => generateCommandBuilder(builder),
        (args) => Generate.generate(args)
    )
    .argv;
