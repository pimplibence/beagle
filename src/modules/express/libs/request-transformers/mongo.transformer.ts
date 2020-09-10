import { compact } from 'lodash';
import { RequestTransformer } from './request-transformer';
import getPrototypeOf = Reflect.getPrototypeOf;

export type MongoPartialQueryCallback = (query) => any;

export class MongoTransformer extends RequestTransformer<MongoPartialQueryCallback[]> {
    public transformers = {
        and: (query) => this.and(query),
        or: (query) => this.or(query),
        options: (query) => this.paginationOptions(query)
    };

    public and(query) {
        const rows = this.options.map((row) => row(query));

        return this.cleanQuery({ $and: compact(rows) });
    }

    public or(query) {
        const rows = this.options.map((row) => row(query));

        return this.cleanQuery({ $or: compact(rows) });
    }

    public paginationOptions(query) {
        return {
            skip: this.parser.getSkip(),
            limit: this.parser.getLimit(),
            sort: this.parser.getSort() || {}
        };
    }

    private cleanQuery(query: any): any {
        /**
         * Return Primitives
         */
        if (query === undefined) {
            return {};
        }

        if (query === null) {
            return {};
        }

        /**
         * Map array queries
         */
        if (Array.isArray(query)) {
            const result = query.map((item) => this.cleanQuery(item));

            if (!result.length) {
                return [{}];
            }

            return result;
        }

        /**
         * This step is filter the rest of non object value
         * - typeof object is matched for almost everything
         */
        if (typeof query !== 'object') {
            return query;
        }

        /**
         * This step will match correctly the PRIMITIVE object value
         * If query in this step is an ObjectId, MomentInstance, Date or any other one, that will not match on it
         */
        if (getPrototypeOf(query) === Object.prototype) {
            const result = {};

            for (const key of Object.keys(query)) {
                result[key] = this.cleanQuery(query[key]);
            }

            return result;
        }

        return query;
    }
}
