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

    public refresh(user: any) {
        return this.adapter.request('get', `/user/${user?._id || user}`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public findById(user: any): Promise<T> {
        return this.adapter.request('get', `/user/${user?._id || user}`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public findByEmail(email: string): Promise<T> {
        return this.findOne({ email: email });
    }

    public findOne(query: any = {}): Promise<T> {
        return this.adapter.request('post', '/user/find-one', { query: query })
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public findMany(query: any = {}, options: any = {}): Promise<T> {
        return this.adapter.request('post', '/user/find-many', { query: query, options: options })
            .then((items) => items.map((i) => UserAdapter.mapDao(this.dao, i)));
    }

    public paginate(query: any = {}, options: any = {}): Promise<T> {
        return this.adapter.request('post', '/user/paginate', { query: query, options: options })
            .then((response) => ({
                ...response,
                items: response.items.map((i) => UserAdapter.mapDao(this.dao, i))
            }));
    }

    public create(options: any = {}): Promise<T> {
        return this.adapter.request('post', '/user', options)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public delete(user: any): Promise<T> {
        return this.adapter.request('delete', `/user/${user?._id || user}`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    // Higher level apis
    public activate(user: any): Promise<T> {
        return this.adapter.request('post', `/user/${user?._id || user}/activate`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public deactivate(user: any): Promise<T> {
        return this.adapter.request('post', `/user/${user?._id || user}/deactivate`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public ban(user: any): Promise<T> {
        return this.adapter.request('post', `/user/${user?._id || user}/ban`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public unban(user: any): Promise<T> {
        return this.adapter.request('post', `/user/${user?._id || user}/unban`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public verify(user: any): Promise<T> {
        return this.adapter.request('post', `/user/${user?._id || user}/verification/verify`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    // More higher level apis
    public generateForgotPasswordToken(user: any): Promise<TokenResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/forgot-password/generate`, null);
    }

    public generateVerificationToken(user: any): Promise<TokenResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/verification/generate`, null);
    }

    public validateForgotPasswordToken(user: any, token: string): Promise<ValidationResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/forgot-password/validate`, {
            token: token
        });
    }

    public validateVerificationToken(user: any, token: string): Promise<ValidationResponse> {
        return this.adapter.request('post', `/user/${user?._id || user}/forgot-password/validate`, {
            token: token
        });
    }
}
