import * as superagent from 'superagent';
import { injectable } from '../../../core/container/decorators/injectable';

/**
 * Captcha service for Google reCAPTCHA v3
 *
 * - https://www.google.com/recaptcha/about
 * - https://developers.google.com/recaptcha/docs/v3
 */

interface VerifyResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
}

@injectable()
export class CaptchaService {
    public static ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';

    public siteKey: string;
    public siteSecret: string;

    constructor(options: any) {
        this.siteKey = options?.siteKey;
        this.siteSecret = options?.siteSecret;
    }

    public async verify(token: string): Promise<VerifyResponse> {
        try {
            const query = {
                secret: this.siteSecret,
                response: token
            };

            return superagent.post(CaptchaService.ENDPOINT)
                .query(query)
                .send()
                .then((response) => response?.body as any);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public check(token: string): Promise<boolean> {
        return this.verify(token)
            .then((response) => !!response.success)
            .catch(() => false);
    }
}
