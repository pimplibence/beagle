#!/usr/bin/env node

import * as yargs from 'yargs';
import { BuilderCallback } from 'yargs';
import { Start } from './commands/start';

const startCommandBuilder: BuilderCallback<any, any> = (builder) => {

    builder.default({
        config: 'config.json'
    });

    builder.alias({
        c: 'config'
    });

    builder.describe({
        config: 'Custom config file path'
    });
};

const scriptCommandBuilder: BuilderCallback<any, any> = (builder) => {

    startCommandBuilder(builder);

    builder.positional('scriptName', {
        describe: 'Name of registered script',
        type: 'string'
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
        'start-headless',
        'Start Application Headless',
        (builder) => startCommandBuilder(builder),
        (args) => Start.run(args)
    )
    .command(
        'script [scriptName]',
        'Execute Application Script',
        (builder) => scriptCommandBuilder(builder),
        (args) => Start.runScript(args)
    )
    .argv;
