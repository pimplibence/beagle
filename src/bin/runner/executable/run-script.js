const workerThread = require('worker_threads');

const config = workerThread.workerData.config;
const environment = require(config.environmentPath);

const application = require('./libs/create-application')(config, environment, true);

const script = workerThread.workerData.script;
const args = workerThread.workerData.args;

application.bootHeadless()
    .then((instance) => instance.runScript(script, args));
