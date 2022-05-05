import { cloneDeep } from 'lodash';
import 'reflect-metadata';
import { v4 } from 'uuid';

/**
 * Metadata key of store of injectable
 */
const storeMetadataKey = 'Injectable(injectable-store)';

/**
 * Descriptor of an injectable member of a class/injectable
 *  key -> Property of class
 *  identifier -> Registered identifier of injectable
 */
export interface InjectableInject {
    key: string;
    target: Function;
    config: InjectableConfig;
}

/**
 * Injectable configuration
 *  name -> name of class (just for debugging)
 *  identifier -> unique identifier of injectable/class
 *  injects -> injected injectables from current class or parent
 */
export interface InjectableConfig {
    name: string;
    identifier: string;
    injects: InjectableInject[];
    onInitCallbacks: string[];
    onTerminateCallbacks: string[];
}

/**
 * This function generates the default/initial config of injectable
 *
 * @param prototype
 */
export function generateConfig(prototype: object): InjectableConfig {
    return {
        identifier: v4(),
        name: prototype.constructor.name,
        injects: [],
        onInitCallbacks: [],
        onTerminateCallbacks: []
    };
}

/**
 * This function initialize and store initial config of injectable <- generateConfig()
 *
 * @param prototype
 */
export function initConfig(prototype: object): void {
    const config = Reflect.getOwnMetadata(storeMetadataKey, prototype) ?? generateConfig(prototype);

    return saveConfig(prototype, config);
}

/**
 * This function store config of injectable <- generateConfig()
 *
 * @param prototype
 * @param config
 */
export function saveConfig(prototype: object, config: InjectableConfig): void {
    return Reflect.defineMetadata(storeMetadataKey, config, prototype);
}

/**
 * This function merge configs into one config in a reference-free way
 *
 * @param current
 * @param parent
 */
export function mergeConfigs(current: InjectableConfig, parent: InjectableConfig): InjectableConfig {
    return {
        name: current.name,
        identifier: current.identifier,
        injects: cloneDeep([
            ...parent?.injects ?? [],
            ...current.injects
        ]),
        onInitCallbacks: cloneDeep([
            ...parent?.onInitCallbacks ?? [],
            ...current.onInitCallbacks
        ]),
        onTerminateCallbacks: cloneDeep([
            ...parent?.onTerminateCallbacks ?? [],
            ...current.onTerminateCallbacks
        ])
    };
}

/**
 * This function retrieve a config in a reference-free way from an injectable
 *
 * @param prototype
 */
export function getConfig(prototype: object) {
    return {
        current: cloneDeep(Reflect.getOwnMetadata(storeMetadataKey, prototype)),
        parent: cloneDeep(Reflect.getOwnMetadata(storeMetadataKey, Object.getPrototypeOf(prototype)))
    };
}

export function getCurrentConfig(prototype: object): InjectableConfig {
    return getConfig(prototype)?.current;
}

/**
 * This function push an inject into an injectable in a painless way
 *
 * @param prototype
 * @param inject
 * @param key
 */
export function addInject(prototype: object, inject: Function, key: string): void {
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

export function addOnInitCallback(prototype: object, key: string): void {
    const config = getCurrentConfig(prototype);

    config.onInitCallbacks.push(key);

    return saveConfig(prototype, config);
}
