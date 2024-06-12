import Redis from 'redis';

const client = Redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, (err, res) => {
    if (err) {
      console.log(`Error setting value for ${schoolName}: ${err.message}`);
    } else {
      console.log(`Set ${schoolName} to ${reply}`);
    }
  });
};

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(`Error getting value for ${schoolName}: ${err.message}`);
    } else {
      console.log(`${schoolName}: ${reply}`);
    }
  });
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
