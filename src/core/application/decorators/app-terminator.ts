import { addTerminator, initConfig } from '../libs/application';

export const appTerminator = () => {
    return (target: object, key: string) => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        addTerminator(target, key);
    };
};
