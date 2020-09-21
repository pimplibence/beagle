#!/usr/bin/env node

import * as yargs from 'yargs';
import { Start } from './commands/start';

const startCommandBuilder: yargs.BuilderCallback<any, any> = (builder) => {

    builder.default({
        config: 'config'
    });

    builder.alias({
        c: 'config',
        m: 'mode'
    });

    builder.describe({
        config: 'Custom config file path',
        mode: 'Runtime mode of Application'
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
        'script [scriptName]',
        'Execute Application Script',
        (builder) => scriptCommandBuilder(builder),
        (args) => Start.runScript(args)
    )
    .argv;
