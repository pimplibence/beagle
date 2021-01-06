import { Adapter } from '../../libs/adapter';
import { UserAdapter } from '../user.adapter';
import { UserPresenter } from './user.presenter';

export class MetaLib<T extends UserPresenter> {
    public adapter: Adapter;
    public dao: any;

    constructor(adapter: Adapter, dao: T) {
        this.adapter = adapter;
        this.dao = dao;
    }

    public async set(user: any, key: string, value: any): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/meta/${user?._id || user}/set`, { key, value });

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async remove(user: any, key: string): Promise<T> {
        try {
            const response = await this.adapter.request('post', `/meta/${user?._id || user}/remove`, { key });

            return UserAdapter.mapDao(this.dao, response);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
