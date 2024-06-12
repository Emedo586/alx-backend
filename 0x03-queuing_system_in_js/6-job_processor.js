const kue = require('kue');

// Create a queue with Kue
const queue = kue.createQueue();

// Create a function named sendNotification
const sendNotification = (phoneNumber, message) => {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Write the queue process that will listen to new jobs on push_notification_code
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
