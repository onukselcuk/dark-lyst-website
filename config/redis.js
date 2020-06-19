const redis = require("async-redis");
const redisClient = redis.createClient();

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

module.exports = redisClient;
