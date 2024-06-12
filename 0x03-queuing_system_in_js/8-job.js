const kue = require('kue');

const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
     .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
     .on('fail', (errorMessage) => {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      })
     .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });

    console.log(`Notification job created: ${job.id}`);
  });
};

module.exports = createPushNotificationsJobs;
