module.exports = (config, environment, headless) => {
    const tsNode = require('./register-tsnode')(config);
    const sentry = require('./register-sentry')(config);

    const entry = require(config.entryPath);

    if (!entry.Application) {
        throw new Error('MissingApplication');
    }

    const compiledConfig = {
        runnerConfig: config,
        environment: environment,
        headless: headless,
        libs: {
            tsNode: tsNode,
            sentry: sentry
        }
    };

    entry.Application.prototype.config = compiledConfig;

    return new entry.Application(compiledConfig);
}
