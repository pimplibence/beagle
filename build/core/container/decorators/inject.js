"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = exports.InjectError = void 0;
const provider_1 = require("../libs/provider");
var InjectError;
(function (InjectError) {
    InjectError["PossibleCircularDependencyError"] = "InjectErrorPossibleCircularDependency";
})(InjectError = exports.InjectError || (exports.InjectError = {}));
const inject = () => {
    return (target, key) => {
        (0, provider_1.initConfig)(target);
        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        const type = Reflect.getOwnMetadata('design:type', target, key);
        if (!(type === null || type === void 0 ? void 0 : type.prototype)) {
            throw new Error(InjectError.PossibleCircularDependencyError);
        }
        (0, provider_1.addInject)(target, type, key);
    };
};
exports.inject = inject;
