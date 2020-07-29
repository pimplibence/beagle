import { Connection } from '@kifly/boxer/src/connection/connection';
import { injectable } from '../../../core/container/decorators/injectable';
import { onInit } from '../../../core/container/decorators/on-init';

@injectable()
export class Boxer extends Connection {
    @onInit()
    public async initialize() {
        try {
            await this.connect();
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
