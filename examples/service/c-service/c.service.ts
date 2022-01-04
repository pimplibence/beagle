import { inject } from '../../../src/core/container/decorators/inject';
import { injectable } from '../../../src/core/container/decorators/injectable';
import { AService } from '../a.service';

@injectable()
export class CService {
    @inject()
    public a: AService;
}
