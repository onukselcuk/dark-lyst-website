const crypto = require("crypto");
const { logger } = require("../config/logger");

const randomStringGenerator = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(128, (error, buf) => {
            if (error) {
                logger.error(`randomStringGenerator Error: ${error}`);
                reject(error);
            } else {
                const token = buf.toString("hex");
                resolve(token);
            }
        });
    });
};

module.exports = randomStringGenerator;
