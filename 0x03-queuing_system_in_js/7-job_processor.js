const kue = require('kue');

// Create an array that will contain the blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a function sendNotification that takes 4 arguments: phoneNumber, message, job, and done
const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100); // track progress to 0 out of 100

  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    done(error);
  } else {
    job.progress(50, 100); // track progress to 50%
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
};

// Create a queue with Kue that will process jobs of the queue push_notification_code_2 with two jobs at a time
const queue = kue.createQueue({
  concurrency: 2,
});

queue.process('push_notification_code_2', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
