import { RequestParser } from '../request.parser';

export class RequestTransformer<T> {
    public parser: RequestParser;
    public options: T;
    public transformers: Record<string, (key) => any> = {};

    constructor(options) {
        this.options = options;
    }

    public setParser(parser: RequestParser) {
        this.parser = parser;
    }

    public transform(key: string): any {
        return this.transformers[key](this.parser.getQuery());
    }
}
