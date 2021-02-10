import { get } from 'lodash';
import { Request } from '../injectables/controller';

export interface QueryParserOptions {
    request: Request;
    transform: any;
}

export class QueryParser {
    public options: QueryParserOptions;

    constructor(options: QueryParserOptions) {
        this.options = options;
    }

    public async transform(key: string, optionsCallback: (...args) => Promise<any> = () => Promise.resolve({})) {
        const transformer = get(this.options.transform, key);

        if (!transformer) {
            return null;
        }

        const transformerResult = await transformer(optionsCallback);

        return transformerResult(this.options.request);
    }
}
