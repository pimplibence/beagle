import * as express from 'express';
import { injectable } from '../../../core/container/decorators/injectable';
import { InternalServerError } from '../errors';

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
    public app: Application = express();

    public static handleError(nextError: boolean = true) {
        return (error: any, req: Request, res: Response, next: NextFunction): void => {
            const e = error?.isHttpError ? error : new InternalServerError(error?.message, error);

            res.status(e.statusCode).json({
                message: e.message,
                payload: e.payload,
                statusCode: e.statusCode
            });

            if (nextError) {
                next(error);
            }
        };
    }

    protected handle(method: string, route: any, handler: any): void {
        this.app[method](route, async (req, res, next) => {
            try {
                const response = await handler(req, res, next);

                res.json(response);
            } catch (e) {
                Controller.handleError(false)(e, req, res, next);
            }
        });
    }
}
