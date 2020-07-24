import * as express from 'express';
import { injectable } from '../../../container/decorators/injectable';
import { InternalServerError } from '../errors';

export interface Application extends express.Application {
    //
}

export interface Request extends express.Request {
    //
}

export interface Response extends express.Response {
    error: (error?: Error | any) => void;
}

export interface NextFunction extends express.NextFunction {
    //
}

@injectable()
export class Controller {
    public app: Application = express();

    constructor() {
        this.app.use((req: Request, res: Response, next: NextFunction) => this.handleError(req, res, next));
    }

    private handleError(req: Request, res: Response, next: NextFunction) {
        res.error = (error: Error | any) => {
            const e = error?.isHttpError ? error : new InternalServerError(error?.message, error);

            return res.status(e.statusCode).json({
                message: error.message,
                payload: error.payload,
                statusCode: error.statusCode
            });
        };

        next();
    }

}
