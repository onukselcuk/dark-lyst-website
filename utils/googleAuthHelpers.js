const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(
    process.env.NEXT_STATIC_GOOGLE_OAUTH_CLIENT_ID
);
const { logger } = require("../config/logger");

const verifyGoogleIDToken = async (token) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_STATIC_GOOGLE_OAUTH_CLIENT_ID
        });

        const payload = ticket.getPayload();

        return payload;
    } catch (error) {
        logger.error(`verifyGoogleIDToken helper function error: ${error}`);
        throw "google_token_invalid";
    }
};

module.exports = { verifyGoogleIDToken };
