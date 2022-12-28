import * as crypto from 'crypto';

export const randomId = () => crypto.randomBytes(30).toString('hex');
