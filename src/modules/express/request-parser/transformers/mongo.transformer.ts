import { mapValues } from 'lodash';
import { PaginationOptions } from '../../../boxer/repository/repository';
import { Request } from '../../injectables/controller';

export abstract class MongoTransformer {
    public static paginationOptions = (options: PaginationOptions<any> = {}) => {
        return (req: Request): PaginationOptions<any> => {
            const page = parseInt(req.query._page as any, 10) || 0;
            const limit = parseInt(req.query._limit as any, 10) || 50;
            const sort = mapValues(req.query._sort || {}, (item) => MongoTransformer
                .sortValues
                .find((v) => (v.match === item))
                ?.value
            );

            return {
                ...options,
                page: page,
                limit: limit,
                sort: sort as any
            };
        };
    }

    public static query = (qcb: any = (req: Request) => ({})) => {
        return (req: Request): any => qcb(req);
    }

    private static sortValues = [
        { match: -1, value: 1 },
        { match: '-1', value: -1 },
        { match: '1', value: 1 },
        { match: 1, value: 1 },
        { match: '0', value: 1 },
        { match: 0, value: 1 }
    ];

    private static arrayQueryOperators = [
        '$and', '$or', '$nor'
    ];
}
