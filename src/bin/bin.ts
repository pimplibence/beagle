#!/usr/bin/env node

import { interval } from 'rxjs';
import * as yargs from 'yargs';
import { Start } from './commands/start';

const startCommandBuilder: yargs.BuilderCallback<any, any> = (builder) => {

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

const scriptCommandBuilder: yargs.BuilderCallback<any, any> = (builder) => {

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
        (args) => Start.runHeadless(args)
    )
    .command(
        'script [scriptName]',
        'Execute Application Script',
        (builder) => scriptCommandBuilder(builder),
        (args) => Start.runScript(args)
    )
    .argv;
