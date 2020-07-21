module.exports = (config, environment, headless) => {
    require('./register-tsnode')(config);

    const entry = require(config.entryPath);

    if (!entry.Application) {
        throw new Error('MissingApplication');
    }

    return new entry.Application({
        config: config,
        environment: environment,
        headless: headless,
    });
}
