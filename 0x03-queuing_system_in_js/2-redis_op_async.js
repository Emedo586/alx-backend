import Redis from 'redis';

const client = Redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.log(`Error setting value for ${schoolName}: ${err.message}`);
    } else {
      client.print(`Set ${schoolName} to ${value}`);
    }
  });
};

const displaySchoolValue = async (schoolName) => {
  try {
    const value = await getAsync(schoolName);
    console.log(`Value for ${schoolName}: ${value}`);
  } catch (err) {
    console.log(`Error getting value for ${schoolName}: ${err.message}`);
  }
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
