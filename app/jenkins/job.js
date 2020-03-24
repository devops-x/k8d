'use strict';

class Job {
  constructor(app) {
    this.client = app.jenkinsClient;
  }

  async info(jobName) {
    return new Promise((resolve, reject) => {
      this.client.job.get(jobName, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      })
    });
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.client.job.list((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}

module.exports = app => {
  return new Job(app);
};