import { injectable } from '../../src/core/container/decorators/injectable';

@injectable()
export class AService {
    constructor(options: any, environment: any) {
        // console.log(options, environment);
    }
}
