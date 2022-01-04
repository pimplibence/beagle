import 'reflect-metadata';
export interface InjectableInject {
    key: string;
    target: Function;
    config: InjectableConfig;
}
export interface InjectableConfig {
    name: string;
    identifier: string;
    injects: InjectableInject[];
    onInitCallbacks: string[];
}
export declare function generateConfig(prototype: object): InjectableConfig;
export declare function initConfig(prototype: object): void;
export declare function saveConfig(prototype: object, config: InjectableConfig): void;
export declare function mergeConfigs(current: InjectableConfig, parent: InjectableConfig): InjectableConfig;
export declare function getConfig(prototype: object): {
    current: any;
    parent: any;
};
export declare function getCurrentConfig(prototype: object): InjectableConfig;
export declare function addInject(prototype: object, inject: Function, key: string): void;
export declare function addOnInitCallback(prototype: object, key: string): void;
