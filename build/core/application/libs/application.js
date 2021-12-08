"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConfigurator = exports.addInitializer = exports.getConfigAll = exports.getConfig = exports.saveConfig = exports.initConfig = exports.generateConfig = void 0;
const lodash_1 = require("lodash");
const storeMetadataKey = 'Injectable(application-store)';
function generateConfig(prototype) {
    return {
        initializers: [],
        configurators: []
    };
}
exports.generateConfig = generateConfig;
function initConfig(prototype) {
    var _a;
    const config = (_a = Reflect.getMetadata(storeMetadataKey, prototype)) !== null && _a !== void 0 ? _a : generateConfig(prototype);
    return saveConfig(prototype, config);
}
exports.initConfig = initConfig;
function saveConfig(prototype, config) {
    return Reflect.defineMetadata(storeMetadataKey, config, prototype);
}
exports.saveConfig = saveConfig;
function getConfig(prototype) {
    return (0, lodash_1.cloneDeep)(Reflect.getMetadata(storeMetadataKey, prototype));
}
exports.getConfig = getConfig;
function getConfigAll(prototype) {
    return (0, lodash_1.cloneDeep)(Reflect.getMetadata(storeMetadataKey, prototype));
}
exports.getConfigAll = getConfigAll;
function addInitializer(prototype, key) {
    const config = getConfig(prototype);
    config.initializers.push({ key: key });
    return saveConfig(prototype, config);
}
exports.addInitializer = addInitializer;
function addConfigurator(prototype, key) {
    const config = getConfig(prototype);
    config.configurators.push({ key: key });
    return saveConfig(prototype, config);
}
exports.addConfigurator = addConfigurator;
