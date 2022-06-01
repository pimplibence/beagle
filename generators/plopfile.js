#!/usr/bin/env node ./node_modules/plop/bin/plop.js
const lodash = require('lodash');

module.exports = (plop) => {
    plop.setHelper('now', () => new Date());
    plop.setHelper('package_json', (path) => lodash.get(require('../package.json'), path));
    plop.setGenerator('application', require('./generators/application')(plop));
}
