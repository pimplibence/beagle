const workerThread = require('worker_threads');

const config = workerThread.workerData.config;
const environment = require(config.environmentPath);

const application = require('./libs/create-application')(config, environment, false);

application.boot();
