'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async deploy() {
    const { ctx } = this;
    const { kubernetes } = this.service;
    kubernetes.deploy();
    ctx.body = {};
  }

  async getAllStatus() {
    const { ctx } = this;
    const { kubernetes } = this.service;

    ctx.body = await kubernetes.getAllStatus();
  }
}

module.exports = ManagerController;
