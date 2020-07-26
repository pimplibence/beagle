module.exports = (config) => {
    if (config.sentry) {
        const sentry = require('@sentry/node');
        sentry.init(config.sentry);

        return sentry;
    }

    return null;
};

