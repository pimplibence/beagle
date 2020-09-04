import { UserPresenter } from '../../src/modules/codebuild/user-adapter/libs/user.presenter';

export class SpecialUser extends UserPresenter {
    public doMagic() {
        return this._id;
    }
}
