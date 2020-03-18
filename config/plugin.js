'use strict';

const path = require('path');

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

  // sqlite db
  sqlite3: {
    enable: false,
    package: 'egg-sqlite3',
  },

  security: {
    enable: false,
  },
};
