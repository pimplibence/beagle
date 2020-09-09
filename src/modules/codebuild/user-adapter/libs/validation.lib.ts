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

    public setPassword(user: any, password: string): Promise<T> {
        return this.adapter.request('post', `/validation/${user?._id || user}/password/set`, { password })
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }

    public validatePassword(user: any, password: string): Promise<ValidationResponse<T>> {
        return this.adapter.request('post', `/validation/${user?._id || user}/password/validate`, { password })
            .then((i) => ({
                isValid: i.isValid,
                user: UserAdapter.mapDao(this.dao, i.user)
            }));
    }

    public removePassword(user: any): Promise<T> {
        return this.adapter.request('post', `/validation/${user?._id || user}/password/remove`, null)
            .then((i) => UserAdapter.mapDao(this.dao, i));
    }
}
