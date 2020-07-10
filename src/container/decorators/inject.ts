import { addInject, initConfig } from '../libs/provider';

/**
 * Inject class-member decorator
 * With this decorator you can inject another injectable into an injectable
 */
export const inject = () => {
    return (target: object, key: string) => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        const type = Reflect.getOwnMetadata('design:type', target, key);

        if (!type?.prototype) {
            throw new Error('PossibleCircularDependencyError');
        }

        addInject(target, type, key);
    };
};
