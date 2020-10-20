module.exports = (config) => {
    /**
     * Register typescript runtime
     */
    if (!config.skipTsNode) {
        const tsNode = require('ts-node');

        tsNode.register({
            pretty: true,
            logError: true,
            project: config.typescript && config.typescript.tsConfigPath
        });

        return tsNode;
    }

    return null;
}
