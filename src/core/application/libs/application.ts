import { cloneDeep } from 'lodash';

/**
 * Metadata key of store of injectable
 */
const storeMetadataKey = 'Injectable(application-store)';

export function generateConfig(prototype: object): any {
    return {
        initializers: [],
        configurators: []
    };
}

export function initConfig(prototype: object): void {
    const config = Reflect.getMetadata(storeMetadataKey, prototype) ?? generateConfig(prototype);

    return saveConfig(prototype, config);
}

export function saveConfig(prototype: object, config: any): void {
    return Reflect.defineMetadata(storeMetadataKey, config, prototype);
}

export function getConfig(prototype: object) {
    return cloneDeep(Reflect.getMetadata(storeMetadataKey, prototype));
}

export function getConfigAll(prototype: object) {
    return cloneDeep(Reflect.getMetadata(storeMetadataKey, prototype));
}

export function addInitializer(prototype: object, key: string): void {
    const config = getConfig(prototype);

    config.initializers.push({ key: key });

    return saveConfig(prototype, config);
}

export function addConfigurator(prototype: object, key: string): void {
    const config = getConfig(prototype);

    config.configurators.push({ key: key });

    return saveConfig(prototype, config);
}
