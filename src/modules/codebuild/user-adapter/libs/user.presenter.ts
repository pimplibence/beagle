export class UserPresenter {
    // tslint:disable-next-line variable-name
    public _id: string;
    // tslint:disable-next-line variable-name
    public _version: string;
    public email: string;
    public meta: Record<string, any> = {};
    public createdAt: Date;
    public updatedAt: Date;
    public activatedAt: Date | null;
    public suspendedAt: Date | null;
    public deletedAt: Date | null;
    public bannedAt: Date | null;
    public verifiedAt: Date | null;

    constructor(options: any) {
        this._id = options && options._id;
        this._version = options && options._version;
        this.email = options && options.email;
        this.meta = options && options.meta || {};
        this.createdAt = options && options.createdAt;
        this.activatedAt = options && options.activatedAt;
        this.suspendedAt = options && options.suspendedAt;
        this.updatedAt = options && options.updatedAt;
        this.deletedAt = options && options.deletedAt;
        this.bannedAt = options && options.bannedAt;
        this.verifiedAt = options && options.verifiedAt;
    }
}
