'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {

  async getAllStatus() {
    const { ctx } = this;
    const { kubernetes } = this.service;

    ctx.body = await kubernetes.getAllStatus();
  }

  async deploy() {
    const { kubernetes } = this.service;
    const body = this.ctx.request.body;
    const result = await kubernetes.deploy(body);
    this.ctx.body = result;
  }
}

module.exports = ManagerController;
