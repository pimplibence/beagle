#!/usr/bin/env node

(async () => {
    const path = await import('path');
    const minimist = await import('minimist');
    const {Plop, run} = await import('plop');

    const args = process.argv.slice(2);
    const argv = minimist.default(args);

    Plop.prepare({
        cwd: argv.cwd,
        configPath: path.join(__dirname, '../generators/plopfile.js'),
        preload: argv.preload || [],
        completion: argv.completion
    }, (env) => Plop.execute(env, run));
})()
