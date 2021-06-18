import * as axios from 'axios';
import { injectable } from '../../../core/container/decorators/injectable';
import { InternalServerError } from '../../express/errors';

@injectable()
export class MeshAdapter {
    protected baseUrl: string;

    constructor(options: any) {
        if (!options.url) {
            throw new InternalServerError('UnknownMeshUrl', {
                handler: this.constructor.name
            });
        }

        if (!options.endpoint) {
            throw new InternalServerError('UnknownMeshEndpoint', {
                handler: this.constructor.name
            });
        }

        this.baseUrl = `${options.url}/p/${options.endpoint}`;
    }

    public async request(options: axios.AxiosRequestConfig = {}): Promise<any> {
        const client = this.client(options);
        const response = await client.request(options);

        return response.data;
    }

    public async get(path: string, options: axios.AxiosRequestConfig = {}) {
        return this.request({ ...options, method: 'get', url: path });
    }

    public async post(path: string, options: axios.AxiosRequestConfig = {}) {
        return this.request({ ...options, method: 'post', url: path });
    }

    public async put(path: string, options: axios.AxiosRequestConfig = {}) {
        return this.request({ ...options, method: 'put', url: path });
    }

    public async delete(path: string, options: axios.AxiosRequestConfig = {}) {
        return this.request({ ...options, method: 'delete', url: path });
    }

    protected client(options: axios.AxiosRequestConfig = {}): axios.AxiosInstance {
        return axios.default.create({
            ...options,
            baseURL: this.baseUrl
        });
    }
}
