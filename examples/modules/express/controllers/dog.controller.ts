import { injectable } from '../../../../src/container/decorators/injectable';
import { onInit } from '../../../../src/container/decorators/on-init';
import { BadRequest } from '../../../../src/modules/express/errors';
import { Controller, Request, Response } from '../../../../src/modules/express/injectables/controller';

@injectable()
export class DogController extends Controller {
    @onInit()
    public initialize() {
        this.app.get('/', this.helloWorld.bind(this));
        this.app.get('/http-error', this.helloHttpError.bind(this));
    }

    public helloWorld(req: Request, res: Response) {
        try {
            res.json({ hello: 'Bello' });
        } catch (e) {
            res.error(e);
        }
    }

    public helloHttpError(req: Request, res: Response) {
        try {
            throw new BadRequest();
        } catch (e) {
            res.error(e);
        }
    }
}
