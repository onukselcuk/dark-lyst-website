const jwt = require("jsonwebtoken");
const { verifyGoogleIDToken } = require("../utils/googleAuthHelpers");
const { logger } = require("../config/logger");

const auth = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        logger.warn("No token, authorization denied");
        return res
            .status(401)
            .json({ msg: "No token, authorization denied", success: false });
    }

    try {
        const decodedToken = jwt.decode(token, { complete: true });

        const payload = decodedToken.payload;

        if (payload && payload.sub) {
            await verifyGoogleIDToken(token);
            req.user = payload;
            return next();
        }

        await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                throw "local_token_invalid";
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        if (error === "google_token_invalid") {
            logger.warn("Google token is not valid");
            return res.status(401).json({
                msg: "Google token is not valid",
                success: false
            });
        } else if (error === "local_token_invalid") {
            logger.warn("Local token is not valid");
            return res.status(401).json({
                msg: "Local Token is not valid",
                success: false
            });
        }

        res.status(500).json({ msg: "Server Error", success: false });
    }
};

module.exports = auth;
