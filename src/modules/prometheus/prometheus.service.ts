import * as express from 'express';
import { createServer } from 'http';
import { collectDefaultMetrics, DefaultMetricsCollectorConfiguration, register } from 'prom-client';
import { injectable } from '../../core/container/decorators/injectable';
import { onInit } from '../../core/container/decorators/on-init';

interface PrometheusServiceOptions {
    appName: string;
    port?: number;
    collectDefaultMetrics?: boolean;
    defaultMetricsOptions?: DefaultMetricsCollectorConfiguration;
}

@injectable()
export class PrometheusService {
    public options: PrometheusServiceOptions;
    public app = express();
    public server = createServer(this.app);

    public register = register;

    constructor(options: PrometheusServiceOptions) {
        this.options = options;

        this.register.setDefaultLabels({
            app: this.options.appName
        });

        if (this.options.collectDefaultMetrics) {
            collectDefaultMetrics({
                ...(this.options.defaultMetricsOptions || {}),
                register: this.register
            });
        }
    }

    @onInit()
    public async init() {
        this.app.get('/metrics', this.handleMetrics.bind(this));

        const port = this.options.port || 9991;

        this.server.listen(port, () => console.log('Prometheus server is running on port', port));
    }

    private async handleMetrics(req, res) {
        const metrics = await register.metrics();

        res.set('Content-Type', register.contentType);
        res.send(metrics);
    }
}