import { addConfigurator, initConfig } from '../libs/application';

export const appConfigurator = () => {
    return (target: object, key: string) => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        addConfigurator(target, key);
    };
};
