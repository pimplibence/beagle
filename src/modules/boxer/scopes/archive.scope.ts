import { DefaultScope } from '@kifly/boxer/src/scope/default.scope';
import { FilterQuery } from 'mongodb';

export class ArchiveScope extends DefaultScope {
    public static findOneQuery<T>(query?: FilterQuery<T>): FilterQuery<T> {
        return {
            $and: [
                super.findOneQuery(query),
                { deletedAt: null }
            ]
        } as any;
    }

    public static findManyQuery<T>(query?: FilterQuery<T>): FilterQuery<T> {
        return this.findOneQuery(query);
    }
}
