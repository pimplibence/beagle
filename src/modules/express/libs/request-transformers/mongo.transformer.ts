import { compact } from 'lodash';
import { RequestTransformer } from './request-transformer';

export type MongoPartialQueryCallback = (query) => any;

export class MongoTransformer extends RequestTransformer<MongoPartialQueryCallback[]> {
    public transformers = {
        andQuery: (query) => this.and(query),
        orQuery: (query) => this.or(query),
        options: (query) => this.paginationOptions(query)
    };

    public and(query) {
        const rows = this.options.map((row) => row(query));

        return { $and: compact(rows) };
    }

    public or(query) {
        const rows = this.options.map((row) => row(query));

        return { $and: compact(rows) };
    }

    public paginationOptions(query) {
        return {
            skip: this.parser.getSkip(),
            limit: this.parser.getLimit(),
            sort: this.parser.getSort() || {}
        };
    }
}
