import { injectable } from '../../../../src/core/container/decorators/injectable';
import { onInit } from '../../../../src/core/container/decorators/on-init';
import { BadRequest } from '../../../../src/modules/express/errors';
import { Controller, Request, Response } from '../../../../src/modules/express/injectables/controller';

@injectable()
export class DogController extends Controller {
    @onInit()
    public initialize() {
        this.json.get('/', this.helloWorld.bind(this));
        this.json.get('/error', this.helloHttpError.bind(this));
    }

    public helloWorld(req: Request, res: Response) {
        return { hello: 'Bello' };
    }

    public helloHttpError(req: Request, res: Response) {
        throw new BadRequest();
    }
}
