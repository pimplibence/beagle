// tslint:disable max-classes-per-file

export class HttpError extends Error {
    // tslint:disable-next-line:variable-name
    public isHttpError = true;
    // tslint:disable-next-line:variable-name
    public _statusCode: number;
    // tslint:disable-next-line:variable-name
    public _payload: any;

    public toJSON() {
        return {
            statusCode: this._statusCode,
            payload: this._payload,
            message: this.message
        };
    }

    protected setStatusCode(code: number) {
        this._statusCode = code;
    }

    protected setPayload(payload: any) {
        this._payload = payload;
    }
}

export class BadRequest extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BadRequest');

        this.setStatusCode(400);
        this.setPayload(payload);
    }
}

export class Unauthorized extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Unauthorized');

        this.setStatusCode(401);
        this.setPayload(payload);
    }
}

export class PaymentRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'PaymentRequired');

        this.setStatusCode(402);
        this.setPayload(payload);
    }
}

export class Forbidden extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Forbidden');

        this.setStatusCode(403);
        this.setPayload(payload);
    }
}

export class NotFound extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotFound');

        this.setStatusCode(404);
        this.setPayload(payload);
    }
}

export class MethodNotAllowed extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'MethodNotAllowed');

        this.setStatusCode(405);
        this.setPayload(payload);
    }
}

export class NotAcceptable extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotAcceptable');

        this.setStatusCode(406);
        this.setPayload(payload);
    }
}

export class ProxyAuthenticationRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ProxyAuthenticationRequired');

        this.setStatusCode(407);
        this.setPayload(payload);
    }
}

export class RequestTimeout extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestTimeout');

        this.setStatusCode(408);
        this.setPayload(payload);
    }
}

export class Conflict extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Conflict');

        this.setStatusCode(409);
        this.setPayload(payload);
    }
}

export class Gone extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Gone');

        this.setStatusCode(410);
        this.setPayload(payload);
    }
}

export class LengthRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'LengthRequired');

        this.setStatusCode(411);
        this.setPayload(payload);
    }
}

export class PreconditionFailed extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'PreconditionFailed');

        this.setStatusCode(412);
        this.setPayload(payload);
    }
}

export class RequestEntityTooLarge extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestEntityTooLarge');

        this.setStatusCode(413);
        this.setPayload(payload);
    }
}

export class RequestURITooLong extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestURITooLong');

        this.setStatusCode(414);
        this.setPayload(payload);
    }
}

export class UnsupportedMediaType extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UnsupportedMediaType');

        this.setStatusCode(415);
        this.setPayload(payload);
    }
}

export class RequestedRangeNotSatisfiable extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestedRangeNotSatisfiable');

        this.setStatusCode(416);
        this.setPayload(payload);
    }
}

export class ExpectationFailed extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ExpectationFailed');

        this.setStatusCode(417);
        this.setPayload(payload);
    }
}

export class EnhanceYourCalm extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'EnhanceYourCalm');

        this.setStatusCode(420);
        this.setPayload(payload);
    }
}

export class UnprocessableEntity extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UnprocessableEntity');

        this.setStatusCode(422);
        this.setPayload(payload);
    }
}

export class Locked extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Locked');

        this.setStatusCode(423);
        this.setPayload(payload);
    }
}

export class FailedDependency extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'FailedDependency');

        this.setStatusCode(424);
        this.setPayload(payload);
    }
}

export class UnorderedCollection extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UnorderedCollection');

        this.setStatusCode(425);
        this.setPayload(payload);
    }
}

export class UpgradeRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UpgradeRequired');

        this.setStatusCode(426);
        this.setPayload(payload);
    }
}

export class PreconditionRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'PreconditionRequired');

        this.setStatusCode(428);
        this.setPayload(payload);
    }
}

export class TooManyRequests extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'TooManyRequests');

        this.setStatusCode(429);
        this.setPayload(payload);
    }
}

export class RequestHeaderFieldsTooLarge extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestHeaderFieldsTooLarge');

        this.setStatusCode(431);
        this.setPayload(payload);
    }
}

export class NoResponse extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NoResponse');

        this.setStatusCode(444);
        this.setPayload(payload);
    }
}

export class RetryWith extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RetryWith');

        this.setStatusCode(449);
        this.setPayload(payload);
    }
}

export class BlockedByWindowsParentalControls extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BlockedByWindowsParentalControls');

        this.setStatusCode(450);
        this.setPayload(payload);
    }
}

export class ClientClosedRequest extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ClientClosedRequest');

        this.setStatusCode(499);
        this.setPayload(payload);
    }
}

export class InternalServerError extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'InternalServerError');

        this.setStatusCode(500);
        this.setPayload(payload);
    }
}

export class NotImplemented extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotImplemented');

        this.setStatusCode(501);
        this.setPayload(payload);
    }
}

export class BadGateway extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BadGateway');

        this.setStatusCode(502);
        this.setPayload(payload);
    }
}

export class ServiceUnavailable extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ServiceUnavailable');

        this.setStatusCode(503);
        this.setPayload(payload);
    }
}

export class GatewayTimeout extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'GatewayTimeout');

        this.setStatusCode(504);
        this.setPayload(payload);
    }
}

export class HTTPVersionNotSupported extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'HTTPVersionNotSupported');

        this.setStatusCode(505);
        this.setPayload(payload);
    }
}

export class VariantAlsoNegotiates extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'VariantAlsoNegotiates');

        this.setStatusCode(506);
        this.setPayload(payload);
    }
}

export class InsufficientStorage extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'InsufficientStorage');

        this.setStatusCode(507);
        this.setPayload(payload);
    }
}

export class LoopDetected extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'LoopDetected');

        this.setStatusCode(508);
        this.setPayload(payload);
    }
}

export class BandwidthLimitExceeded extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BandwidthLimitExceeded');

        this.setStatusCode(509);
        this.setPayload(payload);
    }
}

export class NotExtended extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotExtended');

        this.setStatusCode(510);
        this.setPayload(payload);
    }
}

export class NetworkAuthenticationRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NetworkAuthenticationRequired');

        this.setStatusCode(511);
        this.setPayload(payload);
    }
}
