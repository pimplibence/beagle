"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectable = void 0;
const provider_1 = require("../libs/provider");
const injectable = () => {
    return (target) => {
        (0, provider_1.initConfig)(target.prototype);
        const configs = (0, provider_1.getConfig)(target.prototype);
        const config = (0, provider_1.mergeConfigs)(configs.current, configs.parent);
        (0, provider_1.saveConfig)(target.prototype, config);
    };
};
exports.injectable = injectable;
