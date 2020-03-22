'use strict';

/**
 * 捕或错误执行异步任务
 */
exports.to = (promise, error) => {
  return promise
    .then(data => [null, data])
    .catch(err => {
      if (typeof error === 'string') {
        err.message = error;
      } else if (error instanceof Error) {
        Object.assign(err, error);
      }
      return [err, null];
    });
};


/**
 * 构建健康探测参数，通过HTTP方式做健康探测
 * @param liveness 存活参数
 * @param readiness 就绪参数
 */
exports.getHealthCheckConf = (params, defaultConfig) => {
  const result = {};
  ['liveness', 'readiness'].forEach(key => {
    const newKey = `${key}Probe`;
    const customObj = params[key];
    if (!customObj) {
      return;
    }
    const defaultObj = defaultConfig.healthCheck[newKey];
    result[newKey] = !customObj.isOpen ? null : {
      httpGet: {
        path: customObj.path,
        scheme: customObj.protocol,
        port: parseInt(customObj.port),
        httpHeaders: customObj.headers.map(v => Object.assign({}, { name: v.key, value: v.value })),
      },
      periodSeconds: customObj.periodSeconds || defaultObj.periodSeconds,
      timeoutSeconds: customObj.timeoutSeconds || defaultObj.timeoutSeconds,
      successThreshold: customObj.successThreshold || defaultObj.successThreshold,
      failureThreshold: customObj.failureThreshold || defaultObj.failureThreshold,
      initialDelaySeconds: customObj.initialDelaySeconds || defaultObj.initialDelaySeconds,
    };
  });

  return result;
};


/**
 * 构建部署参数
 */
exports.getK8sDeployConf = (params, defaultConfig) => {
  const { appCode, image, port, spec, healthCheck = {}, envVariables = [], imagePullPolicy = 'IfNotPresent' } = params;
  const healthCheckOpt = params.deployParams ? null : this.getHealthCheckConf(healthCheck, defaultConfig);

  const deployParams = {
    // 构建Deployment参数
    deployment: {
      kind: 'Deployment',
      apiVersion: 'apps/v1',
      metadata: {
        name: appCode,
        namespace: defaultConfig.ns,
        labels: {
          app: appCode,
        },
      },
      spec: {
        // 只创建一个副本
        replicas: 1,
        selector: {
          matchLabels: {
            app: appCode,
          }
        },
        template: {
          metadata: {
            creationTimestamp: null,
            labels: {
              app: appCode,
            },
          },
          spec: {
            containers: [
              Object.assign(
                {},
                defaultConfig.containerPolicy,
                {
                  image,
                  imagePullPolicy,
                  name: appCode,
                  // pod的limit和request使用默认配置
                  resources: defaultConfig.resources,
                },
                // 判断是否需要添加检查探测的参数
                !healthCheckOpt.livenessProbe ? {} : { livenessProbe: healthCheckOpt.livenessProbe },
                !healthCheckOpt.readinessProbe ? {} : { readinessProbe: healthCheckOpt.readinessProbe },
                // 环境变量
                envVariables.length === 0 ? {} : { env: envVariables },
              ),
            ],
          },
        },
        strategy: {
          type: 'RollingUpdate',
          rollingUpdate: {
            maxUnavailable: 1,
            maxSurge: 1,
          },
        },
      },
    },
    // 构建Service参数
    service: {
      kind: 'Service',
      apiVersion: 'v1',
      metadata: {
        name: appCode,
        namespace: defaultConfig.ns,
        labels: {
          app: appCode,
        },
      },
      spec: {
        // 通过NodePort向k8s集群外部暴露服务
        type: 'NodePort',
        ports: [
          {
            protocol: 'TCP',
            port: 8000,
            targetPort: port,
          },
        ],
        selector: {
          app: appCode,
        },
      },
    },
  };

  return deployParams;
};


/**
 * 响应数据
 * @param {import('koa').Context} ctx koa ctx 对象
 * @param {any} content 消息体
 */
exports.responseBody = (ctx, content) => {
  ctx.body = {
    success: true,
    content,
    message: null,
    code: 'OK',
  };
}