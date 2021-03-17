import { BaseApplication } from '../src/core/application/base-application';
import { PrometheusService } from '../src/modules/prometheus/prometheus.service';

export class Application extends BaseApplication {
    protected providers = [
        {
            injectable: PrometheusService,
            options: {
                collectDefaultMetrics: true,
                appName: 'test_prometheus_app'
            }
        }
    ];
}
