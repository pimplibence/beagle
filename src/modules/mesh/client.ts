import * as axios from 'axios';

export class Client {
    public endpoint: any;

    constructor(endpoint: any) {
        this.endpoint = endpoint;
    }

    public async get(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.get(path, config);

        return request?.data;
    }

    public async delete(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.delete(path, config);

        return request?.data;
    }

    public async head(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.head(path, config);

        return request?.data;
    }

    public async options(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.options(path, config);

        return request?.data;
    }

    public async post(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.post(path, config);

        return request?.data;
    }

    public async put(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.put(path, config);

        return request?.data;
    }

    public async patch(path: string, config: axios.AxiosRequestConfig = {}) {
        const client = this.getClient();
        const request = await client.patch(path, config);

        return request?.data;
    }

    private getClient() {
        return axios.default.create({
            method: 'get',
            baseURL: this.endpoint.address,
            responseType: 'json'
        });
    }
}
