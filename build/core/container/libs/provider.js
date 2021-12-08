"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOnInitCallback = exports.addInject = exports.getCurrentConfig = exports.getConfig = exports.mergeConfigs = exports.saveConfig = exports.initConfig = exports.generateConfig = void 0;
const lodash_1 = require("lodash");
require("reflect-metadata");
const uuid_1 = require("uuid");
const storeMetadataKey = 'Injectable(injectable-store)';
function generateConfig(prototype) {
    return {
        identifier: (0, uuid_1.v4)(),
        name: prototype.constructor.name,
        injects: [],
        onInitCallbacks: []
    };
}
exports.generateConfig = generateConfig;
function initConfig(prototype) {
    var _a;
    const config = (_a = Reflect.getOwnMetadata(storeMetadataKey, prototype)) !== null && _a !== void 0 ? _a : generateConfig(prototype);
    return saveConfig(prototype, config);
}
exports.initConfig = initConfig;
function saveConfig(prototype, config) {
    return Reflect.defineMetadata(storeMetadataKey, config, prototype);
}
exports.saveConfig = saveConfig;
function mergeConfigs(current, parent) {
    var _a, _b;
    return {
        name: current.name,
        identifier: current.identifier,
        injects: (0, lodash_1.cloneDeep)([
            ...(_a = parent === null || parent === void 0 ? void 0 : parent.injects) !== null && _a !== void 0 ? _a : [],
            ...current.injects
        ]),
        onInitCallbacks: (0, lodash_1.cloneDeep)([
            ...(_b = parent === null || parent === void 0 ? void 0 : parent.onInitCallbacks) !== null && _b !== void 0 ? _b : [],
            ...current.onInitCallbacks
        ])
    };
}
exports.mergeConfigs = mergeConfigs;
function getConfig(prototype) {
    return {
        current: (0, lodash_1.cloneDeep)(Reflect.getOwnMetadata(storeMetadataKey, prototype)),
        parent: (0, lodash_1.cloneDeep)(Reflect.getOwnMetadata(storeMetadataKey, Object.getPrototypeOf(prototype))),
    };
}
exports.getConfig = getConfig;
function getCurrentConfig(prototype) {
    var _a;
    return (_a = getConfig(prototype)) === null || _a === void 0 ? void 0 : _a.current;
}
exports.getCurrentConfig = getCurrentConfig;
function addInject(prototype, inject, key) {
    const config = getCurrentConfig(prototype);
    const injectConfig = getCurrentConfig(inject.prototype);
    if (config.identifier === injectConfig.identifier) {
        throw new Error('SelfInjectDetected');
    }
    config.injects.push({
        key: key,
        target: inject,
        config: injectConfig
    });
    return saveConfig(prototype, config);
}
exports.addInject = addInject;
function addOnInitCallback(prototype, key) {
    const config = getCurrentConfig(prototype);
    config.onInitCallbacks.push(key);
    return saveConfig(prototype, config);
}
exports.addOnInitCallback = addOnInitCallback;
