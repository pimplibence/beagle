import { injectable } from '../../../core/container/decorators/injectable';
import { Adapter, AdapterOptions } from '../libs/adapter';
import { UserLib } from './libs/user.lib';
import { UserPresenter } from './libs/user.presenter';

export interface UserAdapterOptions<T extends UserPresenter> extends AdapterOptions {
    dao: typeof UserPresenter;
}

@injectable()
export class UserAdapter<T extends UserPresenter> extends Adapter {
    public dao: typeof UserPresenter;
    public user: UserLib<T>;

    constructor(options: UserAdapterOptions<T>) {
        super(options);

        const dao: any = options.dao || UserPresenter;

        this.user = new UserLib<T>(this, dao);
    }
}
