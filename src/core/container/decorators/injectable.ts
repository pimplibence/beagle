import { getConfig, initConfig, mergeConfigs, saveConfig } from '../libs/provider';

/**
 * Injectable class decorator
 * With this decorator, you can mark a class as injectable to use in Container
 */
export const injectable = () => {
    return (target: Function): any => {
        initConfig(target.prototype);

        const configs = getConfig(target.prototype);
        const config = mergeConfigs(configs.current, configs.parent);

        saveConfig(target.prototype, config);

        return target;
    };
};
