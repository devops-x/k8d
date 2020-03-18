'use strict';

class Pod {

  constructor(app) {
    this.KubeClient = app.k8sClient;
    this.ns = app.config.kubernetes.ns;
  }

  /**
   * 获取Pod运行信息
   * @param filters 筛选项
   */
  async info(params) {
    return this.KubeClient.api.v1.namespaces(this.ns).pods.get(params.filters || {});
  };

  /**
   * 获取pod日志
   * @param podName pod名称
   * @param containerName 容器名称
   */
  async logs(params) {
    return this.KubeClient.api.v1.namespaces(this.ns).pods(params.podName).log.get({
      qs: Object.assign(logOutput, {
        container: params.containerName,
      }),
    });
  };

}

module.exports = app => {
  return new Pod(app);
};