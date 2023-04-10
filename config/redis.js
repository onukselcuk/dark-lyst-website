const redis = require("async-redis");
const redisClient = redis.createClient({url:process.env.REDIS_URL});
const { logger } = require("./logger");

redisClient.on("connect", () => {
    logger.info("Redis Connected");
});

module.exports = redisClient;
