import Redis from 'redis';

const subscriber = Redis.createClient();

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

subscriber.subscribe('holberton school channel', (err, count) => {
  if (err) {
    console.log(`Error subscribing to channel: ${err.message}`);
  } else {
    console.log(`Subscribed to holberton school channel`);
  }
});

subscriber.on('message', (channel, message) => {
  console.log(`Received message on ${channel}: ${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
