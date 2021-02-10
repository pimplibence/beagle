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

    public async request(method: string, path: string, body: any, query: any = {}): Promise<any> {
        const url = resolve(this.endpoint, path);

        try {
            const result = await superagent[method](url)
                .query(query)
                .send(body);

            return result.body;
        } catch (e) {
            if (e.errno === 'ECONNREFUSED') {
                throw new InternalServerError('ICEConnection', e);
            }

            if (e?.response?.body) {
                throw new InternalServerError(e?.response?.body?.message || 'ICEUnknownResponse', e?.response?.body?.payload);
            }

            throw new InternalServerError('ICEUnknown', e);
        }
    }
}
