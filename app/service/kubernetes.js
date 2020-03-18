'use strict';

const Service = require('egg').Service;

class KubernetesService extends Service {

  async deploy() {
  }

  async delete() {

  }

  /**
   * 获取所有Pods、Depployments、Service列表
   * @param filters 筛选条件
   * @returns Object {podStatusMap, deploymentStatusMap} 分别为Pod状态Map和Deployment状态Map
   */
  async getAllStatus(params = {}) {
    const {
      Pod, Deployment, Service: k8sService,
    } = this.ctx.kubernetes;
    // 获取Deployment列表和Pod列表
    const [podsInfo, deploymentsInfo, servicesInfo] = await Promise.all([
      Pod.info(params.podFilters || {}),
      Deployment.info(params.deploymentFilters || {}),
      k8sService.info(params.serviceFilters || {}),
    ]);

    // Pod状态对应关系
    const podStatusMap = podsInfo.body.items
      .reduce((prev, next) => Object.assign(prev, {
        [next.metadata.labels.app]: {
          // pod的名称
          podName: next.metadata.name,
          // pod状态
          phase: next.status.phase,
          // pod调度情况
          conditions: next.status.conditions,
          // 镜像pull、容器创建情况
          containers: next.status.containerStatuses || [],
        },
      }), {});

    // Deployment状态对应关系
    const deploymentStatusMap = deploymentsInfo.body.items
      .reduce((prev, next) => Object.assign(prev, {
        [next.metadata.name]: {
          // Deployment的名称
          deploymentName: next.metadata.name,
          // Pod创建状态
          conditions: next.status.conditions || [],
        },
      }), {});

    // Service状态对应关系
    const serviceStatusMap = servicesInfo.body.items
      .reduce((prev, next) => Object.assign(prev, {
        [next.metadata.name]: {
          // service透出的端口
          nodePort: next.spec.ports[0].nodePort,
        },
      }), {});

    return { podStatusMap, deploymentStatusMap, serviceStatusMap };
  }

  async monitorServiceState() {

  }

  async getContainerLogs() {

  }
}

module.exports = KubernetesService;