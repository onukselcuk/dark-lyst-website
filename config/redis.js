const redis = require("async-redis");
const redisClient = redis.createClient();

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

redisClient.set("test", "heyyyy");

module.exports = redisClient;
