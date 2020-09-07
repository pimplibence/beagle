import { Request } from '../injectables/controller';
import { RequestTransformer } from './request-transformers/request-transformer';

enum RequestQueryAttributes {
    LIMIT = 'limit',
    PAGE = 'page',
    SEARCH = 'search',
    SORT = 'sort',
}

export interface RequestParserOptions {
    attributeValidation?: boolean;
    attributes?: Record<RequestQueryAttributes, string>;
    defaults?: Record<RequestQueryAttributes, number | string>;
    enabledSortKeys?: string[];
    enabledQueryKeys?: string[];
    transformer?: RequestTransformer<any>;
}

export class RequestParser {
    private static readonly POSSIBLE_SORT_VALUES = [1, -1];

    public readonly request: Request;
    private readonly enabledSortKeys: string[] = [];
    private readonly enabledQueryKeys: string[] = [];
    private readonly transformer: RequestTransformer<any>;

    private readonly attributes: Record<RequestQueryAttributes, string> = {
        [RequestQueryAttributes.LIMIT]: '_limit',
        [RequestQueryAttributes.PAGE]: '_page',
        [RequestQueryAttributes.SEARCH]: '_search',
        [RequestQueryAttributes.SORT]: '_sort'
    };

    private readonly defaults: Record<RequestQueryAttributes, number | string> = {
        [RequestQueryAttributes.LIMIT]: 100,
        [RequestQueryAttributes.PAGE]: 0,
        [RequestQueryAttributes.SEARCH]: null,
        [RequestQueryAttributes.SORT]: null
    };

    constructor(request: Request, options?: RequestParserOptions) {
        this.request = request;
        this.attributes = options?.attributes ?? this.attributes;
        this.defaults = options?.defaults ?? this.defaults;
        this.enabledSortKeys = options?.enabledSortKeys ?? this.enabledSortKeys;
        this.enabledQueryKeys = options?.enabledQueryKeys ?? this.enabledQueryKeys;
        this.transformer = options?.transformer;
    }

    public toJSON() {
        return {
            page: this.getPage(),
            limit: this.getLimit(),
            skip: this.getSkip(),
            search: this.getSearch(),
            sort: this.getSort(),
            query: this.getQuery()
        };
    }

    public getLimit(): number {
        const raw: any = this.request.query[this.attributes[RequestQueryAttributes.LIMIT]];

        if (typeof raw === 'undefined') {
            return this.defaults[RequestQueryAttributes.LIMIT] as number;
        }

        if (typeof raw === 'object') {
            return this.defaults[RequestQueryAttributes.LIMIT] as number;
        }

        const parsed = parseInt(raw, 10);

        if (!Number.isInteger(parsed)) {
            return this.defaults[RequestQueryAttributes.LIMIT] as number;
        }

        return Math.max(0, parsed);
    }

    public getPage(): number {
        const raw: any = this.request.query[this.attributes[RequestQueryAttributes.PAGE]];

        if (typeof raw === 'undefined') {
            return this.defaults[RequestQueryAttributes.PAGE] as number;
        }

        if (typeof raw === 'object') {
            return this.defaults[RequestQueryAttributes.PAGE] as number;
        }

        const parsed = parseInt(raw, 10);

        if (!Number.isInteger(parsed)) {
            return this.defaults[RequestQueryAttributes.PAGE] as number;
        }

        return Math.max(0, parsed);
    }

    public getSkip(): number {
        return this.getPage() * this.getLimit();
    }

    public getSearch(): number {
        const raw: any = this.request.query[this.attributes[RequestQueryAttributes.SEARCH]];

        if (typeof raw === 'undefined') {
            return this.defaults[RequestQueryAttributes.SEARCH] as number;
        }

        if (typeof raw === 'object') {
            return this.defaults[RequestQueryAttributes.SEARCH] as number;
        }

        return raw;
    }

    public getSort(): any {
        const raw: any = this.request.query[this.attributes[RequestQueryAttributes.SORT]];

        if (typeof raw === 'undefined') {
            return this.defaults[RequestQueryAttributes.SORT];
        }

        if (typeof raw === 'string') {
            return this.defaults[RequestQueryAttributes.SORT];
        }

        if (typeof raw === 'number') {
            return this.defaults[RequestQueryAttributes.SORT];
        }

        /**
         * TODO -> Find better alternative if exists (Obviously exists)
         */
        if (Array.isArray(raw)) {
            return this.defaults[RequestQueryAttributes.SORT];
        }

        const keys = Object.keys(raw);
        const sort = {};

        for (const key of keys) {
            const value = raw[key];
            const parsed = parseInt(value, 10);

            if (!RequestParser.POSSIBLE_SORT_VALUES.includes(parsed)) {
                continue;
            }

            if (!this.enabledSortKeys.includes(key)) {
                continue;
            }

            sort[key] = parsed;
        }

        return sort;
    }

    public getQuery(): any {
        const raw: any = this.request.query;
        const keys = Object.keys(raw);
        const excludedKeys = Object.keys(this.attributes);
        const possibleKeys = keys.filter((key) => !excludedKeys.includes(key));

        const query = {};

        for (const key of possibleKeys) {
            if (!this.enabledQueryKeys.includes(key)) {
                continue;
            }

            query[key] = raw[key];
        }

        return query;
    }

    public transform(key: string) {
        if (!this.transformer) {
            return null;
        }

        if (!this.transformer.transformers[key]) {
            return null;
        }

        this.transformer.setParser(this);

        return this.transformer.transform(key);
    }
}
