const redis = require("async-redis");
const redisClient = redis.createClient();
const { logger } = require("./logger");

redisClient.on("connect", () => {
    logger.info("Redis Connected");
});

module.exports = redisClient;
