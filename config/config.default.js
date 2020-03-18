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

  // k8s connect config
  config.kubernetes = {
    ns: 'k8d',
    version: '1.13',
    // 是否启用本地配置 ~/.kube/config
    enableLocal: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
