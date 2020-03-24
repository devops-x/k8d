'use strict';

const Service = require('egg').Service;

class JenkinsService extends Service {

  async getJobInfo(jobName) {
    return this.ctx.jenkins.Job.info(jobName);
  }

  async getJobList() {
    return this.ctx.jenkins.Job.list();
  }

}

module.exports = JenkinsService;