import { createHmac } from 'crypto';
import * as superagent from 'superagent';
import { injectable } from '../../core/container/decorators/injectable';
import { InternalServerError } from '../express/errors';

@injectable()
export class FacebookServiceV12 {
    public static readonly DEFAULT_SCOPE = ['id', 'name', 'email'];
    public static readonly DEFAULT_VERSION = 'v12.0';
    public static readonly DEFAULT_ENDPOINT = 'https://graph.facebook.com';

    public config: any;

    constructor(config: any) {
        this.config = config;
    }

    public async me(accessToken: string, scope: string[] = []): Promise<any> {
        const appSecretProof = this.createFacebookAppSecretProof(accessToken);

        const scopes = [
            ...FacebookServiceV12.DEFAULT_SCOPE,
            ...scope
        ];

        const endpoint = `${this.getDefaultEndpoint()}/me`;

        const query = {
            fields: scopes.join(','),
            access_token: accessToken,
            appsecret_proof: appSecretProof
        };

        const response = await superagent.get(endpoint)
            .set('Content-Type', 'application/json')
            .query(query)
            .then((response) => JSON.parse(response.text));

        if (!response.email) {
            throw new InternalServerError('FacebookResponseMissingEmail');
        }

        return response;
    }

    private getDefaultEndpoint(): string {
        return `${FacebookServiceV12.DEFAULT_ENDPOINT}/${FacebookServiceV12.DEFAULT_VERSION}`;
    }

    private createFacebookAppSecretProof(accessToken: string): string {
        const appSecret = this.config.appSecret;

        const hmac = createHmac('sha256', appSecret);

        const data = hmac.update(accessToken);

        return data.digest('hex');
    }
}
