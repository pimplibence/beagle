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

    public transform(key: string, options: any = {}) {
        const transformer = get(this.options.transform, key);

        if (!transformer) {
            return null;
        }

        return transformer(options)(this.options.request);
    }
}
