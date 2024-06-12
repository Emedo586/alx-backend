import Redis from 'redis';

const client = Redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

const createHash = () => {
  const hashKey = 'HolbertonSchools';
  client.hset(hashKey, 'Portland', 50, (err, count) => {
    if (err) {
      console.log(`Error setting Portland value: ${err.message}`);
    } else {
      client.print(`Set Portland value to 50`);
    }
  });
  client.hset(hashKey, 'Seattle', 80, (err, count) => {
    if (err) {
      console.log(`Error setting Seattle value: ${err.message}`);
    } else {
      client.print(`Set Seattle value to 80`);
    }
  });
  client.hset(hashKey, 'New York', 20, (err, count) => {
    if (err) {
      console.log(`Error setting New York value: ${err.message}`);
    } else {
      client.print(`Set New York value to 20`);
    }
  });
  client.hset(hashKey, 'Bogota', 20, (err, count) => {
    if (err) {
      console.log(`Error setting Bogota value: ${err.message}`);
    } else {
      client.print(`Set Bogota value to 20`);
    }
  });
  client.hset(hashKey, 'Cali', 40, (err, count) => {
    if (err) {
      console.log(`Error setting Cali value: ${err.message}`);
    } else {
      client.print(`Set Cali value to 40`);
    }
  });
  client.hset(hashKey, 'Paris', 2, (err, count) => {
    if (err) {
      console.log(`Error setting Paris value: ${err.message}`);
    } else {
      client.print(`Set Paris value to 2`);
    }
  });
};

const displayHash = () => {
  const hashKey = 'HolbertonSchools';
  client.hgetall(hashKey, (err, obj) => {
    if (err) {
      console.log(`Error getting hash values: ${err.message}`);
    } else {
      console.log(`Hash values: ${JSON.stringify(obj, null, 2)}`);
    }
  });
};
