import { injectable } from '../../../core/container/decorators/injectable';
import { Adapter, AdapterOptions } from '../libs/adapter';
import { MetaLib } from './libs/meta.lib';
import { UserLib } from './libs/user.lib';
import { UserPresenter } from './libs/user.presenter';
import { ValidationLib } from './libs/validation.lib';

export interface UserAdapterOptions<T extends UserPresenter> extends AdapterOptions {
    dao: typeof UserPresenter;
}

@injectable()
export class UserAdapter<T extends UserPresenter> extends Adapter {
    public dao: typeof UserPresenter;

    public user: UserLib<T>;
    public meta: MetaLib<T>;
    public validation: ValidationLib<T>;

    constructor(options: UserAdapterOptions<T>) {
        super(options);

        const dao: any = options.dao || UserPresenter;

        this.user = new UserLib<T>(this, dao);
        this.meta = new MetaLib<T>(this, dao);
        this.validation = new ValidationLib<T>(this, dao);
    }
}
