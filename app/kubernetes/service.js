'use strict';

class Service {

  constructor(app) {
    this.KubeClient = app.k8sClient;
    this.ns = app.config.kubernetes.ns;
  }

  /**
   * 创建Service
   * @param service service配置
   */
  async create(params) {
    return this.KubeClient.api.v1.namespaces(this.ns).services.post({
      body: params.service,
    });
  };

  /**
   * 删除Service
   * @param serviceName service名称
   */
  async delete(params) {
    return this.KubeClient.api.v1.namespaces(this.ns).services(params.serviceName).delete();
  };

  /**
   * 获取Service运行信息
   * @param filters 筛选项
   */
  async info(params) {
    return this.KubeClient.api.v1.namespaces(this.ns).services.get(params.filters || {});
  };

}

module.exports = app => {
  return new Service(app);
};