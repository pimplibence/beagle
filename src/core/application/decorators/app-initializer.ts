import { addInitializer, initConfig } from '../libs/application';

export const appInitializer = () => {
    return (target: object, key: string) => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        addInitializer(target, key);
    };
};
