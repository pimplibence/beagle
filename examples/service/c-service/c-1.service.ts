import { inject } from '../../../src/core/container/decorators/inject';
import { injectable } from '../../../src/core/container/decorators/injectable';
import { AService } from '../a.service';

@injectable()
export class C1Service {
    @inject()
    public a: AService;
}
