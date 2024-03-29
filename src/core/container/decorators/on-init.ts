import { addOnInitAsyncCallback, addOnInitCallback, initConfig } from '../libs/provider';

/**
 * OnInit class-member decorator
 * With this decorator you can mark an injectable method as lifecycle callback
 * - run after construction
 */
export const onInit = () => {
    return (target: object, key: string): any => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        addOnInitCallback(target, key);

        return target.constructor;
    };
};

export const onInitAsync = () => {
    return (target: object, key: string): any => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        addOnInitAsyncCallback(target, key);

        return target.constructor;
    };
};
