const workerThread = require('worker_threads');

const config = workerThread.workerData.config;
const script = workerThread.workerData.script;
const args = workerThread.workerData.args;

const environment = require(config.environmentPath);
const application = require('./libs/create-application')(config, environment);

application.boot().then((instance) => {
    instance.runScript(script, args)
        .then(() => process.exit())
});
