import { Provider } from '../../application/application';
import { getConfig, initConfig, mergeConfigs, saveConfig } from '../libs/provider';

export interface InjectableOptions {
    dependencies?: (parentOptions?: any) => Provider[];
}

/**
 * Injectable class decorator
 * With this decorator, you can mark a class as injectable to use in Container
 */
export const injectable = (options?: InjectableOptions) => {
    return (target: Function): any => {
        initConfig(target.prototype);

        const configs = getConfig(target.prototype);

        const config = mergeConfigs(
            { ...configs.current, dependencies: options?.dependencies },
            { ...configs.parent }
        );

        saveConfig(target.prototype, config);

        return target;
    };
};
