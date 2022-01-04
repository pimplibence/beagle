import { inject } from '../../src/core/container/decorators/inject';
import { injectable } from '../../src/core/container/decorators/injectable';
import { CService } from './c-service/c.service';

@injectable()
export class BService {
    @inject()
    public c: CService;
}
