module.exports = (config) => {
    const tsNode = require('ts-node');

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
