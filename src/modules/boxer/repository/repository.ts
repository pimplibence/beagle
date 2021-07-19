import { AggregateOptions, Collection, CountOptions, FindManyOptions, FindOneOptions } from '@kifly/boxer/src/collections/collection';
import { Connection } from '@kifly/boxer/src/connection/connection';
import { BaseDocument } from '@kifly/boxer/src/document/base.document';
import { FilterQuery, ObjectId } from 'mongodb';

export interface PaginationResponse<D> {
    total: number;
    items: D[];
    page: number;
    limit: number;
}

export interface PaginationOptions<D> extends FindManyOptions<D> {
    skip?: number;
    page?: number;
    estimate?: boolean;
}

export class Repository<D extends BaseDocument<any>> {
    // tslint:disable-next-line
    private _document: typeof BaseDocument;
    // tslint:disable-next-line
    private _connection: Connection;

    constructor(document: typeof BaseDocument, connection: Connection) {
        this._document = document;
        this._connection = connection;
    }

    public async delete(id: string | ObjectId, options: FindOneOptions<D> = {}) {
        const item = await this.findById(id, options);

        return item.delete();
    }

    public findById(id: string | ObjectId, options: FindOneOptions<D> = {}): Promise<D> {
        try {
            const did = id.toString();

            if (!ObjectId.isValid(did)) {
                throw new Error('IncompatibleId');
            }

            return this.findOne({ _id: new ObjectId(did) as any }, options);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async findOne(query?: FilterQuery<D>, options: FindOneOptions<D> = {}): Promise<D> {
        try {
            await this.check();

            const result = await this.getCollection().findOne(query, options);

            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async findMany(query?: FilterQuery<D>, options: FindManyOptions<D> = {}): Promise<D[]> {
        try {
            await this.check();

            return this.getCollection().findMany(query, options);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async count(query?: FilterQuery<D>, options: CountOptions<D> = {}): Promise<number> {
        try {
            await this.check();

            return this.getCollection().count(query, options);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async aggregate(pipeline: object[], options: AggregateOptions<D>): Promise<D[]> {
        try {
            await this.check();

            return this.getCollection().aggregate(pipeline, options);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async paginate(query?: FilterQuery<D>, options: PaginationOptions<D> = {}): Promise<PaginationResponse<D>> {
        try {
            await this.check();

            const page = parseInt(options.page || 0 as any, 10);
            const limit = parseInt(options.limit || 50 as any, 10);

            const findManyOptions: FindManyOptions<D> = {
                ...(options || {}),
                skip: page * limit,
                limit: limit
            };

            const countOptions: CountOptions<D> = {
                scope: options.scope,
                options: options.options as any,
                estimate: options?.estimate
            };

            const count = await this.getCollection().count(query, countOptions);

            if (!count) {
                return Promise.resolve({
                    total: 0,
                    page: page,
                    limit: limit,
                    items: []
                });
            }

            return Promise.resolve({
                total: count,
                page: page,
                limit: limit,
                items: await this.getCollection().findMany(query, findManyOptions)
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    protected getCollection(): Collection<any> {
        return this._connection.collection(this._document) as Collection<any>;
    }

    protected check() {
        if (!this._document || !this._connection) {
            throw new Error('BadServiceConfiguration');
        }
    }
}
