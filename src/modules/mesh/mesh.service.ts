import { timer } from 'rxjs';
import * as superagent from 'superagent';
import { injectable } from '../../core/container/decorators/injectable';
import { onInit } from '../../core/container/decorators/on-init';
import { InternalServerError } from '../express/errors';
import { Client } from './client';

@injectable()
export class MeshService {
    private api: string;
    private endpoints: any[] = [];
    private clients: Client[] = [];
    private updateInterval: number;

    constructor(options: any) {
        this.api = options?.api;
        this.updateInterval = Math.max(100, options?.updateInterval || 3000);
    }

    @onInit()
    public async initialize() {
        await this.updateCatalog();

        timer(this.updateInterval).subscribe(() => this.updateCatalog());
    }

    public endpoint(name: string) {
        const item = this.endpoints.find((item) => item.name === name);

        if (!item) {
            throw new InternalServerError('UnknownEndpoint', {
                name: name
            });
        }

        return item;
    }

    public client(name: string) {
        const item = this.clients.find((item) => item.endpoint.name === name);

        if (!item) {
            throw new InternalServerError('UnknownEndpoint', {
                name: name
            });
        }

        return item;
    }

    private async updateCatalog() {
        try {
            const endpoints = await superagent.get(`${this.api}/catalog`);

            if (!endpoints?.body) {
                throw new InternalServerError('UnableToGetEndpointCatalog', {
                    error: 'MissingBody'
                });
            }

            this.endpoints = endpoints.body;
            this.clients = this.endpoints.map((item) => new Client(item));
        } catch (e) {
            throw new InternalServerError('UnableToGetEndpointCatalog', e);
        }
    }
}
