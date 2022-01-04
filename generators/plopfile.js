#!/usr/bin/env node ./node_modules/plop/bin/plop.js

module.exports = (plop) => {
    plop.setHelper('now', () => new Date());
    plop.setGenerator('application', require('./generators/application')(plop));
}
