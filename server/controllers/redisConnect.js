
const Redis = require('redis');
const redisClient = Redis.createClient({host: '52.91.205.48'});

//const redisClient = Redis.createClient();
//redisClient.on('connect', () => console.log('Hi redis'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

module.exports = redisClient;
