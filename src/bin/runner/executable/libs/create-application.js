module.exports = (config, environment, headless) => {
    require('./register-tsnode')(config);

    const entry = require(config.entryPath);

    if (!entry.Application) {
        throw new Error('MissingApplication');
    }

    const compiledConfig = {
        runnerConfig: config,
        environment: environment,
        headless: headless
    };

    entry.Application.prototype.config = compiledConfig;

    return new entry.Application(compiledConfig);
}
