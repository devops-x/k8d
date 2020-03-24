'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // k8s client
  kubernetes: {
    enable: true,
    package: 'egg-kubernetes',
  },

  // sqlite orm
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  security: {
    enable: false,
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  jenkins: {
    enable: true,
    package: 'egg-jenkins',
  }
};
