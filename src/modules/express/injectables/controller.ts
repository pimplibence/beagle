import * as express from 'express';
import { injectable } from '../../../container/decorators/injectable';
import { InternalServerError } from '../errors';

interface ParsedError {
    statusCode: number;
    message: string;
    payload: any;
}

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
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.error = (error: Error | any) => {
                const parsed = this.parseError(error);

                res.status(500).json(parsed);
            };

            next();
        });
    }

    private parseError(error?: Error | any): ParsedError {
        console.log('lashflkasfj', error);

        if (!error) {
            const e = new InternalServerError();

            return e.toJSON();
        }

        if (error.isHttpError) {
            return error.toJSON();
        }

        const e = new InternalServerError(error.message, error);

        return e.toJSON();
    }
}
