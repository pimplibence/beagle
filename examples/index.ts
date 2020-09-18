import { BaseApplication, Provider } from '../src/core/application/base-application';
import { CaptchaService } from '../src/modules/google/captcha.service';

export class Application extends BaseApplication {
    public reCaptchaConfig = {
        siteKey: '6Lfc4M0ZAAAAAP9QTYotcelqJbWso1z6HnjsNyfL',
        siteSecret: '6Lfc4M0ZAAAAAI3D_jqAd09KsuseVObFYmqaMhJO'
    };

    protected providers: Provider[] = [
        { injectable: CaptchaService, options: this.reCaptchaConfig }
    ];

    protected async initialize(): Promise<void> {
        console.log('Initialize');
    }

    protected async configure(): Promise<void> {
        const captcha = this.container.resolve<CaptchaService>(CaptchaService);

        const response = await captcha.check('z_TY6iZtPTJpwpQ5pSXw6neY5bx5lOzLi9RQDCHKNMh1jtj3lLWzJqTXhkzJkkQeUhdR5UU225w7WO2KcDoEi8qqXyj20xL4zyMRswWTQMyuyxk7kx5jG3RHidvFHzk0WzaJCNZC9pH0SjuFdvMToP4fc6cpJIADGmHewrGPctoO6N5t9sD7eeM_gghdWhV1oj-8aZL9Se5Xy1ZL3wp6ZPjOHz7dUBV6LX6AZxkJ2v8Osm6wLUrgyTFoVN9Aq1_nkEr_K54GtSR-MG8TISL6MYY2i8hcqUNO7qivpjdj_lp_R1woNg00mZLOEidJd4L7_-OcqolyhanxW107dck2aCTc9Lb5DpefEgEBUe5oOpyQKSxEYfrhBOq8CARpdx5ondj_nNTVsN9OervtvenDXsh99fvPsCi3zGc0t1BMyOHkWLhK8UVVdUmyq');

        console.log(response);
    }
}
