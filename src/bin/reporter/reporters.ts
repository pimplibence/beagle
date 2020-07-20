import { DefaultReporter } from './default.reporter';
import { Reporter } from './libs/reporter';

export abstract class Reporters {
    public static reporters = {
        default: DefaultReporter
    };

    public static getReporter(name: string, config: any): Reporter {
        if (!this[name]) {
            throw new Error('UnknownReporter');
        }

        return new this[name](config);
    }
}
