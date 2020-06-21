const nextEnv = require("next-env");
require("dotenv").config();

const withNextEnv = nextEnv();

module.exports = withNextEnv({
    // Your Next.js config.
});
