import { Adapter } from '../../libs/adapter';
import { UserPresenter } from './user.presenter';

export class MetaLib<T extends UserPresenter> {
    public adapter: Adapter;
    public dao: any;

    constructor(adapter: Adapter, dao: T) {
        this.adapter = adapter;
        this.dao = dao;
    }

    public set(user: any, key: string, value: any): Promise<T> {
        return this.adapter.request('post', `/meta/${user?._id || user}/set`, { key, value })
            .then((i) => new this.dao(i));
    }

    public remove(user: any, key: string): Promise<T> {
        return this.adapter.request('post', `/meta/${user?._id || user}/set`, { key })
            .then((i) => new this.dao(i));
    }
}
