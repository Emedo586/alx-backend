const { createPushNotificationsJobs } = require('./8-job');
const kue = require('kue');

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.exit();
    queue.flush();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).toThrowError('Jobs is not an array');
  });

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).toBe(2);
    expect(queue.testMode.jobs[0].type).toBe('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).toEqual(jobs[0]);
    expect(queue.testMode.jobs[1].type).toBe('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).toEqual(jobs[1]);
  });
});
