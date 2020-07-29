import { DefaultScope } from '@kifly/boxer/src/scope/default.scope';
import { FilterQuery } from 'mongodb';

export class ArchivableScope extends DefaultScope {
    static findOneQuery<T>(query?: FilterQuery<T>): FilterQuery<T> {
        return {
            $and: [
                super.findOneQuery(query),
                { deletedAt: null }
            ]
        } as any;
    }
}
