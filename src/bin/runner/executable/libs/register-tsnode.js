const tsNode = require('ts-node');

module.exports = (config) => {
    /**
     * Register typescript runtime
     */
    if (config.typescript) {
        tsNode.register({
            pretty: true,
            logError: true,
            project: config.typescript.tsConfigPath
        });
    }
}
