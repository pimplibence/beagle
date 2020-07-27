import * as express from 'express';
import { injectable } from '../../../core/container/decorators/injectable';
import { InternalServerError } from '../errors';

export enum SupportedHandlerType {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete',
    USE = 'use',
    ALL = 'all'
}

export interface Application extends express.Application {
    //
}

export interface Request extends express.Request {
    //
}

export interface Response extends express.Response {
    //
}

export interface NextFunction extends express.NextFunction {
    //
}

@injectable()
export class Controller {
    public static handleError() {
        return (error: any, req: Request, res: Response, next: NextFunction): void => {
            const e = error?.isHttpError ? error : new InternalServerError(error?.message, error);

            res.status(e.statusCode).json({
                message: e.message,
                payload: e.payload,
                statusCode: e.statusCode
            });

            next(error);
        };
    }

    public static handleVoid() {
        return (error: any, req: Request, res: Response, next: NextFunction): void => {
            next();
        };
    }

    public app: Application = express();

    protected handle(method: SupportedHandlerType, path: any, handler: any): void {
        this.app[method](path, async (req: any, res: any, next: any) => {
            try {
                const response = await handler(req, res, next);

                res.json(response);
            } catch (e) {
                Controller.handleError()(e, req, res, next);
            }
        });
    }
}
