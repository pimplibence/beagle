/*
TODO -> Name: Termination feature

import { addOnTerminateCallback, initConfig } from '../libs/provider';

export const onTerminate = () => {
    return (target: object, key: string) => {
        initConfig(target);

        Object.defineProperty(target, key, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        addOnTerminateCallback(target, key);
    };
};

 */
