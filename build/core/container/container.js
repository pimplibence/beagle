"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.ContainerError = void 0;
const provider_1 = require("./libs/provider");
var ContainerError;
(function (ContainerError) {
    ContainerError["IncompatibleInjectable"] = "ContainerErrorIncompatibleInjectable";
    ContainerError["InjectableIsAlreadyExists"] = "ContainerErrorInjectableIsAlreadyExists";
    ContainerError["InjectedInjectableIsNotRegistered"] = "ContainerErrorInjectedInjectableIsNotRegistered";
    ContainerError["UnableToResolveUnknownInjectable"] = "ContainerErrorUnableToResolveUnknownInjectable";
})(ContainerError = exports.ContainerError || (exports.ContainerError = {}));
class Container {
    constructor(options) {
        this.debug = false;
        this.injectables = {};
        this.initialized = {};
        this.debug = !!(options === null || options === void 0 ? void 0 : options.debug);
    }
    register(injectable, options) {
        const config = (0, provider_1.getCurrentConfig)(injectable === null || injectable === void 0 ? void 0 : injectable.prototype);
        if (!config) {
            throw new Error(ContainerError.IncompatibleInjectable);
        }
        const exists = !!this.getInjectableRecord(config);
        if (exists) {
            throw new Error(ContainerError.InjectableIsAlreadyExists);
        }
        this.addInjectableRecord(injectable, config, options);
    }
    resolve(injectable) {
        const config = (0, provider_1.getCurrentConfig)(injectable.prototype);
        if (!config) {
            throw new Error(ContainerError.IncompatibleInjectable);
        }
        const initialized = this.getInitializedRecord(config);
        if (!initialized) {
            throw new Error(ContainerError.UnableToResolveUnknownInjectable);
        }
        return initialized.instance;
    }
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            const records = Object
                .keys(this.injectables)
                .map((key) => this.injectables[key]);
            for (const record of records) {
                yield this.bootInjectable(record);
            }
        });
    }
    bootInjectable(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialized = this.getInitializedRecord(record.config);
            if (initialized) {
                return initialized.instance;
            }
            for (const inject of record.config.injects) {
                const injectRecord = this.getInjectableRecord(inject.config);
                if (!injectRecord) {
                    throw new Error(ContainerError.InjectedInjectableIsNotRegistered);
                }
                record.injectable.prototype[inject.key] = yield this.bootInjectable(injectRecord);
            }
            const instance = new record.injectable(record.options);
            for (const callbackKey of record.config.onInitCallbacks) {
                yield instance[callbackKey]();
            }
            this.addInitializedRecord(record.config, instance);
            return instance;
        });
    }
    addInjectableRecord(injectable, config, options) {
        this.injectables[config.identifier] = {
            injectable: injectable,
            config: config,
            options: options
        };
    }
    getInjectableRecord(config) {
        return this.injectables[config.identifier];
    }
    addInitializedRecord(config, instance) {
        this.initialized[config.identifier] = {
            config: config,
            instance: instance
        };
    }
    getInitializedRecord(config) {
        return this.initialized[config.identifier];
    }
}
exports.Container = Container;
