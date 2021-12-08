import { BaseApplication } from '../core/application/base-application';

export const applicationRunner = async (app: typeof BaseApplication, environment: any = {}) => {
    app.prototype.environment = environment || {};

    const instance: BaseApplication = new (app as any)();

    await instance.boot();
};
