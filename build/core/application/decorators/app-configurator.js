"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigurator = void 0;
const application_1 = require("../libs/application");
const appConfigurator = () => {
    return (target, key) => {
        (0, application_1.initConfig)(target);
        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        (0, application_1.addConfigurator)(target, key);
    };
};
exports.appConfigurator = appConfigurator;
