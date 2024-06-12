const kue = require('kue');

// Create a queue with Kue
const queue = kue.createQueue();

// Create an object containing the Job data
const jobData = {
  phoneNumber: string,
  message: string,
};

// Create a queue named push_notification_code, and create a job with the object created before
queue.create('push_notification_code', jobData)
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('fail', (errorMessage) => {
    console.log(`Notification job failed: ${errorMessage}`);
  })
  .on('job enqueue', (id) => {
    console.log(`Notification job created: ${id}`);
  });
