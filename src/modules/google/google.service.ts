import { Auth, google } from 'googleapis';
import { injectable } from '../../core/container/decorators/injectable';
import { onInit } from '../../core/container/decorators/on-init';
import { BadRequest } from '../express/errors';

// ya29.a0AfH6SMAV6PSafDl2_-Fm5wx3ro_L9FrAErAD--bnNtX…XdQ5ohBrXOPkMUYDrUzHR8e03rWp2qgHSjWLW6RRLwdpQ2D40

@injectable()
export class GoogleService {
    public client: Auth.OAuth2Client;
    public config: any;

    constructor(config: any) {
        this.config = config;
    }

    @onInit()
    public async initialize() {
        if (!this.config?.clientId) {
            throw new Error('MissingGoogleClientId');
        }

        this.client = new google.auth.OAuth2(this.config);
    }

    public async me(idToken: string): Promise<Auth.TokenPayload> {
        const response = await this.client.verifyIdToken({
            idToken: idToken,
            audience: this.config.clientId
        });

        const payload = response.getPayload();

        if (payload.azp !== this.config.clientId) {
            throw new BadRequest('GoogleAuthForeignClientIdVerification');
        }

        if (!payload.email_verified) {
            throw new BadRequest('GoogleAuthUnverifiedEmail');
        }

        return payload;
    }
}
