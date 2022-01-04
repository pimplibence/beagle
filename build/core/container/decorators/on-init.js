"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInit = void 0;
const provider_1 = require("../libs/provider");
const onInit = () => {
    return (target, key) => {
        (0, provider_1.initConfig)(target);
        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        (0, provider_1.addOnInitCallback)(target, key);
    };
};
exports.onInit = onInit;
