/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584497754213_9805';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // sqlite client
  config.sequelize = {
    dialect: 'sqlite',
    storage: 'k8d.sqlite',
  }

  // k8s connect config
  config.kubernetes = {
    ns: 'default',
    version: '1.13',
    // 是否启用本地配置 ~/.kube/config
    enableLocal: true,
    // 默认容器策略
    containerPolicy: {
      // 重启策略
      restartPolicy: 'Always',
      // k8s将会给应用发送SIGTERM信号，可以用来正确、优雅地关闭应用,默认为30秒
      terminationGracePeriodSeconds: 30,
      // DNS策略
      dnsPolicy: 'ClusterFirst',
      // 采用kube-scheduler的默认调度，不指定节点
      nodeSelector: {},
      securityContext: {},
      schedulerName: 'default-scheduler',
    },
    // 默认容器资源限制
    resources: {
      // 默认内存512Mi、1CPU，使用节点的共享CPU资源
      limits: {
        memory: '512Mi',
        cpu: '0.2',
      },
      // 默认内存256Mi、0.5CPU
      requests: {
        memory: '256Mi',
        cpu: '0.1',
      },
    },
    // 默认健康检查配置项
    healthCheck: {
      livenessProbe: {
        timeoutSeconds: 30,
        periodSeconds: 10,
        initialDelaySeconds: 1,
        successThreshold: 1,
        failureThreshold: 3,
      },
      readinessProbe: {
        timeoutSeconds: 30,
        periodSeconds: 10,
        initialDelaySeconds: 1,
        successThreshold: 1,
        failureThreshold: 3,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
