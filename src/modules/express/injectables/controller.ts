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
    public static handleError(nextError = false) {
        return (error: any, req: Request, res: Response, next: NextFunction): void => {
            res.status(error.statusCode || 500).json({
                message: error.message,
                payload: error.payload,
                statusCode: error.statusCode
            });

            if (nextError) {
                next(error);
            }
        };
    }

    public app: Application = express();

    protected json: Record<SupportedHandlerType, any> = {
        [SupportedHandlerType.ALL]: (path: any, handler: any) => this._handleJson(SupportedHandlerType.ALL, path, handler),
        [SupportedHandlerType.USE]: (path: any, handler: any) => this._handleJson(SupportedHandlerType.USE, path, handler),
        [SupportedHandlerType.GET]: (path: any, handler: any) => this._handleJson(SupportedHandlerType.GET, path, handler),
        [SupportedHandlerType.POST]: (path: any, handler: any) => this._handleJson(SupportedHandlerType.POST, path, handler),
        [SupportedHandlerType.PUT]: (path: any, handler: any) => this._handleJson(SupportedHandlerType.PUT, path, handler),
        [SupportedHandlerType.DELETE]: (path: any, handler: any) => this._handleJson(SupportedHandlerType.DELETE, path, handler),
    };

    protected middleware: Record<SupportedHandlerType, any> = {
        [SupportedHandlerType.ALL]: (path: any, handler: any) => this._middleware(SupportedHandlerType.ALL, path, handler),
        [SupportedHandlerType.USE]: (path: any, handler: any) => this._middleware(SupportedHandlerType.USE, path, handler),
        [SupportedHandlerType.GET]: (path: any, handler: any) => this._middleware(SupportedHandlerType.GET, path, handler),
        [SupportedHandlerType.POST]: (path: any, handler: any) => this._middleware(SupportedHandlerType.POST, path, handler),
        [SupportedHandlerType.PUT]: (path: any, handler: any) => this._middleware(SupportedHandlerType.PUT, path, handler),
        [SupportedHandlerType.DELETE]: (path: any, handler: any) => this._middleware(SupportedHandlerType.DELETE, path, handler),
    };

    // tslint:disable-next-line function-name
    private _handleJson(method: SupportedHandlerType, path: any, handler: any): void {
        this.app[method](path, async (req: any, res: any, next: any) => {
            try {
                const response = await handler(req, res, next);

                return res.json(response);
            } catch (e) {
                if (!e) {
                    return next(new InternalServerError('UnknownError', e));
                }

                return next(e?.isHttpError ? e : new InternalServerError(e?.message, e));
            }
        });
    }

    // tslint:disable-next-line function-name
    private _middleware(method: SupportedHandlerType, path: any, handler: any): void {
        this.app[method](path, async (req: any, res: any, next: any) => {
            try {
                await handler(req, res);

                return next();
            } catch (e) {
                if (!e) {
                    return next(new InternalServerError('UnknownError', e));
                }

                return next(e?.isHttpError ? e : new InternalServerError(e?.message, e));
            }
        });
    }
}
