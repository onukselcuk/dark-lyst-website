const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(
    process.env.NEXT_STATIC_GOOGLE_OAUTH_CLIENT_ID
);

const verifyGoogleIDToken = async (token) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_STATIC_GOOGLE_OAUTH_CLIENT_ID
        });

        const payload = ticket.getPayload();

        return payload;
    } catch (error) {
        throw "google_token_invalid";
    }
};

module.exports = { verifyGoogleIDToken };
