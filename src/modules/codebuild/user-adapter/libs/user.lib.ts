import { Adapter } from '../../libs/adapter';
import { UserAdapter } from '../user.adapter';
import { UserPresenter } from './user.presenter';

interface TokenResponse {
    token: string;
}

interface ValidationResponse {
    isValid: string;
}

export class UserLib<T extends UserPresenter> {
    public adapter: Adapter;
    public dao: any;

    constructor(adapter: Adapter, dao: T) {
        this.adapter = adapter;
        this.dao = dao;
    }

    public async refresh(user: any) {
        return this.findById(user);
    }

    public async findById(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('get', `/user/${user?._id || user}`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async findByEmail(email: string): Promise<T> {
        return this.findOne({ email: email });
    }

    public async findOne(query: any = {}): Promise<T> {
        try {
            const response = await this.adapter.request('post', '/user/find-one', { query: query });

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async findMany(query: any = {}, options: any = {}): Promise<T> {
        try {
            const response = await this.adapter.request('post', '/user/find-many', { query: query, options: options });

            return response.map((item) => UserAdapter.mapDao(this.dao, item));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async paginate(query: any = {}, options: any = {}): Promise<T> {
        try {
            const response = await this.adapter.request('post', '/user/paginate', { query: query, options: options });

            return response.map(() => ({ ...response, items: response.items.map((item) => UserAdapter.mapDao(this.dao, item)) }));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async create(options: any = {}): Promise<T> {
        try {
            const response = await this.adapter.request('post', '/user', options);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async delete(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('delete', `/user/${user?._id || user}`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // Higher level apis
    public async activate(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/user/${user?._id || user}/activate`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async deactivate(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/user/${user?._id || user}/deactivate`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async ban(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/user/${user?._id || user}/ban`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async unban(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/user/${user?._id || user}/unban`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async verify(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/user/${user?._id || user}/verification/verify`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    // More higher level apis
    public async generateForgotPasswordToken(user: any): Promise<TokenResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/forgot-password/generate`, null);
    }

    public async generateVerificationToken(user: any): Promise<TokenResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/verification/generate`, null);
    }

    public async validateForgotPasswordToken(user: any, token: string): Promise<ValidationResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/forgot-password/validate`, {
            token: token
        });
    }

    public async validateVerificationToken(user: any, token: string): Promise<ValidationResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/forgot-password/validate`, {
            token: token
        });
    }
}
