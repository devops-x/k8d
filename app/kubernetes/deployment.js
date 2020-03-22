'use strict';

class Deployment {

  constructor(app) {
    this.KubeClient = app.k8sClient;
    this.ns = app.config.kubernetes.ns;
  }

  /**
 * 创建Deployment
 * @param deployment deployment配置
 */
  async create(params) {
    return this.KubeClient.apis.apps.v1.namespaces(this.ns).deployments.post({
      body: params.deployment,
    });
  };

  /**
   * 删除Deployment
   * @param deploymentName deployment名称
   */
  async delete(params) {
    return this.KubeClient.apis.apps.v1.namespaces(this.ns).deployments(params.deploymentName).delete({
      body: {
        gracePeriodSeconds: 0,
        orphanDependents: false,
      },
    });
  };

  /**
   * 获取Deployment运行信息
   * @param filters 筛选项
   */
  async info(params = {}) {
    return this.KubeClient.apis.apps.v1.namespaces(this.ns).deployments.get(params.filters || {});
  };

}

module.exports = app => {
  return new Deployment(app);
};