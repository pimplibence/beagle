import { execSync } from 'child_process';
import * as hygen from 'hygen';
import { resolve } from 'path';
import { Arguments } from 'yargs';

export class Generate {
    public static async generate(args: Arguments<any>): Promise<void> {
        const instance = new Generate();

        return instance.generate(args);
    }

    public async generate(args: Arguments): Promise<void> {
        await hygen.runner(process.argv.splice(3), {
            cwd: this.getCwd(),
            templates: this.getTemplates(),
            logger: this.getLogger(),
            createPrompter: () => this.getPrompter(),
            exec: (sh) => this.getExec(sh)
        });
    }

    private getCwd(): string {
        return process.env.PWD;
    }

    private getTemplates(): string {
        return resolve(__dirname, '../..', './_templates');
    }

    private getLogger(): hygen.Logger {
        return new hygen.Logger(console.log.bind(console));
    }

    private getPrompter() {
        return require('enquirer');
    }

    private getExec(sh) {
        return execSync(sh);
    }
}
