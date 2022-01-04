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
exports.BaseApplication = void 0;
const container_1 = require("../container/container");
const application_1 = require("./libs/application");
class BaseApplication {
    constructor() {
        this.initialized = false;
        this.debug = false;
        this.providers = [];
    }
    static run(options) {
        const env = options === null || options === void 0 ? void 0 : options.env;
        const debug = !!(options === null || options === void 0 ? void 0 : options.debug);
        this.prototype.env = env;
        this.prototype.debug = debug;
        this.prototype.container = new container_1.Container({
            debug: debug
        });
        const instance = new this();
        return instance.boot();
    }
    boot() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const initializers = ((_a = (0, application_1.getConfigAll)(this)) === null || _a === void 0 ? void 0 : _a.initializers) || [];
            const configurators = ((_b = (0, application_1.getConfigAll)(this)) === null || _b === void 0 ? void 0 : _b.configurators) || [];
            for (const item of initializers) {
                yield this[item.key]();
            }
            yield this.loadInjectables();
            for (const item of configurators) {
                yield this[item.key]();
            }
            return this;
        });
    }
    loadInjectables() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const provider of this.providers) {
                this.container.register(provider.injectable, provider.options);
            }
            yield this.container.boot();
            this.initialized = true;
        });
    }
}
exports.BaseApplication = BaseApplication;
