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
                .maxResponseSize(20000000000) // 18gb
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

    public async requestWithHeaders(method: string, path: string, body: any, query: any = {}, headers = {}): Promise<any> {
        const url = resolve(this.endpoint, path);

        try {
            const result = await superagent[method](url)
                .set({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...(headers || {})
                })
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
