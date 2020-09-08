import * as superagent from 'superagent';
import { resolve } from 'url';
import { InternalServerError } from '../../express/errors';

export interface AdapterOptions {
    endpoint: string;
}

export class Adapter {
    public endpoint: string;

    constructor(options: AdapterOptions) {
        this.endpoint = options.endpoint;
    }

    public async request(method: string, path: string, body: any): Promise<any> {
        const url = resolve(this.endpoint, path);

        try {
            const result = await superagent[method](url).send(body);

            return result.body;
        } catch (e) {
            if (e.errno === 'ECONNREFUSED') {
                return new InternalServerError('ICEConnection', e);
            }

            if (e?.response?.body) {
                return new InternalServerError(e?.response?.body?.message || 'ICEUnknownResponse', e?.response?.body?.payload);
            }

            return new InternalServerError('ICEUnknown', e);
        }
    }
}