import { Adapter } from '../../libs/adapter';
import { UserAdapter } from '../user.adapter';
import { UserPresenter } from './user.presenter';

export interface ValidationResponse<T> {
    isValid: boolean;
    user: T;
}

export class ValidationLib<T extends UserPresenter> {
    public adapter: Adapter;
    public dao: any;

    constructor(adapter: Adapter, dao: T) {
        this.adapter = adapter;
        this.dao = dao;
    }

    public async setPassword(user: any, password: string): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/validation/${user?._id || user}/password/set`, { password });

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async validatePassword(user: any, password: string): Promise<ValidationResponse<T>> {
        try {
            const response = await this.adapter.request('post', `/validation/${user?._id || user}/password/validate`, { password });

            return {
                isValid: response.isValid,
                user: UserAdapter.mapDao(this.dao, response.user)
            };
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async removePassword(user: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/validation/${user?._id || user}/password/remove`, null);

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
