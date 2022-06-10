import * as os from 'os';

export const defaultExecutable = (): any => {
    switch (os.type()) {
        case 'Linux':
            return '/usr/local/bin/helm';
        case 'Darwin':
            return '/opt/homebrew/bin/helm';
        case 'Windows_NT':
            throw new Error('UnableToGetDefaultExecutableUnsupportedOsType');
        default:
            throw new Error('UnableToGetDefaultExecutableUnknownOsType');
    }
};
