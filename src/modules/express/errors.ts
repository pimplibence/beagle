// tslint:disable max-classes-per-file

class HttpError extends Error {
    public isHttpError = true;
    public statusCode: number;
    public payload: any;
}

export class BadRequest extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BadRequest');

        this.payload = payload ?? null;
        this.statusCode = 400;
    }
}

export class Unauthorized extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Unauthorized');

        this.payload = payload ?? null;
        this.statusCode = 401;
    }
}

export class PaymentRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'PaymentRequired');

        this.payload = payload ?? null;
        this.statusCode = 402;
    }
}

export class Forbidden extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Forbidden');

        this.payload = payload ?? null;
        this.statusCode = 403;
    }
}

export class NotFound extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotFound');

        this.payload = payload ?? null;
        this.statusCode = 404;
    }
}

export class MethodNotAllowed extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'MethodNotAllowed');

        this.payload = payload ?? null;
        this.statusCode = 405;
    }
}

export class NotAcceptable extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotAcceptable');

        this.payload = payload ?? null;
        this.statusCode = 406;
    }
}

export class ProxyAuthenticationRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ProxyAuthenticationRequired');

        this.payload = payload ?? null;
        this.statusCode = 407;
    }
}

export class RequestTimeout extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestTimeout');

        this.payload = payload ?? null;
        this.statusCode = 408;
    }
}

export class Conflict extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Conflict');

        this.payload = payload ?? null;
        this.statusCode = 409;
    }
}

export class Gone extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Gone');

        this.payload = payload ?? null;
        this.statusCode = 410;
    }
}

export class LengthRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'LengthRequired');

        this.payload = payload ?? null;
        this.statusCode = 411;
    }
}

export class PreconditionFailed extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'PreconditionFailed');

        this.payload = payload ?? null;
        this.statusCode = 412;
    }
}

export class RequestEntityTooLarge extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestEntityTooLarge');

        this.payload = payload ?? null;
        this.statusCode = 413;
    }
}

export class RequestURITooLong extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestURITooLong');

        this.payload = payload ?? null;
        this.statusCode = 414;
    }
}

export class UnsupportedMediaType extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UnsupportedMediaType');

        this.payload = payload ?? null;
        this.statusCode = 415;
    }
}

export class RequestedRangeNotSatisfiable extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestedRangeNotSatisfiable');

        this.payload = payload ?? null;
        this.statusCode = 416;
    }
}

export class ExpectationFailed extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ExpectationFailed');

        this.payload = payload ?? null;
        this.statusCode = 417;
    }
}

export class EnhanceYourCalm extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'EnhanceYourCalm');

        this.payload = payload ?? null;
        this.statusCode = 420;
    }
}

export class UnprocessableEntity extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UnprocessableEntity');

        this.payload = payload ?? null;
        this.statusCode = 422;
    }
}

export class Locked extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'Locked');

        this.payload = payload ?? null;
        this.statusCode = 423;
    }
}

export class FailedDependency extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'FailedDependency');

        this.payload = payload ?? null;
        this.statusCode = 424;
    }
}

export class UnorderedCollection extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UnorderedCollection');

        this.payload = payload ?? null;
        this.statusCode = 425;
    }
}

export class UpgradeRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'UpgradeRequired');

        this.payload = payload ?? null;
        this.statusCode = 426;
    }
}

export class PreconditionRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'PreconditionRequired');

        this.payload = payload ?? null;
        this.statusCode = 428;
    }
}

export class TooManyRequests extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'TooManyRequests');

        this.payload = payload ?? null;
        this.statusCode = 429;
    }
}

export class RequestHeaderFieldsTooLarge extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RequestHeaderFieldsTooLarge');

        this.payload = payload ?? null;
        this.statusCode = 431;
    }
}

export class NoResponse extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NoResponse');

        this.payload = payload ?? null;
        this.statusCode = 444;
    }
}

export class RetryWith extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'RetryWith');

        this.payload = payload ?? null;
        this.statusCode = 449;
    }
}

export class BlockedByWindowsParentalControls extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BlockedByWindowsParentalControls');

        this.payload = payload ?? null;
        this.statusCode = 450;
    }
}

export class ClientClosedRequest extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ClientClosedRequest');

        this.payload = payload ?? null;
        this.statusCode = 499;
    }
}

export class InternalServerError extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'InternalServerError');

        this.payload = payload ?? null;
        this.statusCode = 500;
    }
}

export class NotImplemented extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotImplemented');

        this.payload = payload ?? null;
        this.statusCode = 501;
    }
}

export class BadGateway extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BadGateway');

        this.payload = payload ?? null;
        this.statusCode = 502;
    }
}

export class ServiceUnavailable extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'ServiceUnavailable');

        this.payload = payload ?? null;
        this.statusCode = 503;
    }
}

export class GatewayTimeout extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'GatewayTimeout');

        this.payload = payload ?? null;
        this.statusCode = 504;
    }
}

export class HTTPVersionNotSupported extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'HTTPVersionNotSupported');

        this.payload = payload ?? null;
        this.statusCode = 505;
    }
}

export class VariantAlsoNegotiates extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'VariantAlsoNegotiates');

        this.payload = payload ?? null;
        this.statusCode = 506;
    }
}

export class InsufficientStorage extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'InsufficientStorage');

        this.payload = payload ?? null;
        this.statusCode = 507;
    }
}

export class LoopDetected extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'LoopDetected');

        this.payload = payload ?? null;
        this.statusCode = 508;
    }
}

export class BandwidthLimitExceeded extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'BandwidthLimitExceeded');

        this.payload = payload ?? null;
        this.statusCode = 509;
    }
}

export class NotExtended extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NotExtended');

        this.payload = payload ?? null;
        this.statusCode = 510;
    }
}

export class NetworkAuthenticationRequired extends HttpError {
    constructor(message?: string, payload?: any) {
        super(message || 'NetworkAuthenticationRequired');

        this.payload = payload ?? null;
        this.statusCode = 511;
    }
}
