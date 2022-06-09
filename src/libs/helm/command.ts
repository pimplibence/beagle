import { spawn } from 'child_process';

export interface CommandOptions {
    executable: string;
}

export interface ExecuteOptions {
    command: string;
    output: boolean;
    args: string[];
}

export class Command {
    private readonly executable: string;

    public constructor(options: CommandOptions) {
        this.executable = options.executable || 'helm';
    }

    public async execute(options: ExecuteOptions) {
        const _args = [
            options.command,
            ...options.args
        ];

        if (options.output) {
            _args.push('--output');
            _args.push('json');
        }

        const stream = spawn(this.executable, _args);

        return new Promise((resolve, reject) => {
            let stdout = '';
            let stderr = '';

            stream.stdout.on('data', (line) => (stdout += line));
            stream.stderr.on('data', (line) => (stderr += line));

            stream.on('close', () => {
                if (!!stderr) {
                    return reject(stderr);
                }

                if (!options.output) {
                    return resolve(null);
                }

                return resolve(JSON.parse(stdout));
            });
        });

    }
}
