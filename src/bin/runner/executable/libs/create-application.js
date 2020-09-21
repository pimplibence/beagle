module.exports = (config, environment) => {
    require('./register-tsnode')(config);

    const entry = require(config.entryPath);

    if (!entry.Application) {
        throw new Error('MissingApplication');
    }

    const compiledConfig = {
        runnerConfig: config,
        environment: environment
    };

    entry.Application.prototype.config = compiledConfig;

    return new entry.Application(compiledConfig);
}
