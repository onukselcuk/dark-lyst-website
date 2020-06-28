const express = require("express");
const router = express.Router();
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");
const gravatar = require("gravatar");
const passResetMailer = require("../../utils/passResetMailer");
const noAccountPassResetMailer = require("../../utils/noAccountPassResetMailer");
const randomStringGenerator = require("../../utils/randomStringGenerator");
const dev = process.env.NODE_ENV !== "production";
const { verifyGoogleIDToken } = require("../../utils/googleAuthHelpers");
const { logger } = require("../../config/logger");

/**load user info */
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select(
            "-password -passwordResetToken -passwordResetExpiry"
        );

        let userData = await user
            .populate("movieList")
            .populate("showList")
            .populate("personList")
            .execPopulate();

        res.json(userData);
    } catch (error) {
        logger.error(`/auth route ${error}`);
        res.status(500).send("Server Error");
    }
});

/**verify token */
router.get("/verify", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        logger.warn("/auth/verify route - No token,authorization denied");
        return res
            .status(401)
            .json({ msg: "No token, authorization denied", success: false });
    }

    try {
        const decodedToken = jwt.decode(token, { complete: true });

        const payload = decodedToken.payload;

        if (payload && payload.sub) {
            await verifyGoogleIDToken(token);
            return res.status(200).json({ msg: "Valid Token", success: true });
        }

        await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                throw "local_token_invalid";
            } else {
                res.status(200).json({ msg: "Valid Token", success: true });
            }
        });
    } catch (error) {
        if (error === "google_token_invalid") {
            logger.error("Google token is not valid");
            return res.status(401).json({
                msg: "Google token is not valid",
                success: false
            });
        } else if (error === "local_token_invalid") {
            logger.error("Local token is not valid");
            return res.status(401).json({
                msg: "Local Token is not valid",
                success: false
            });
        }

        logger.error(`/verify route - Server Error:${error}`);
        res.status(500).json({ msg: "Server Error", success: false });
    }
});

router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("name", "Name cannot be longer than 20 characters").isLength({
            max: 20
        }),
        check("email", "Please include a valid email address").isEmail(),
        check(
            "password",
            "Please enter a password with 8 or more characters"
        ).isLength({ min: 8 }),
        check("confirm", "Please confirm your password")
            .exists()
            .custom((value, { req }) => value === req.body.password),
        check("recaptcha", "Captcha code is invalid").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.warn("/register route validation errors");
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, recaptcha } = req.body;

        try {
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

            const recaptchaResponse = await axios.post(recaptchaUrl);

            if (!recaptchaResponse.data.success) {
                logger.warn("/register route Recaptcha token is not valid");
                return res.status(400).json({
                    errors: [{ msg: "Recaptcha token is not valid" }]
                });
            }

            let user = await User.findOne({ email });

            if (user) {
                logger.warn(
                    "/register route User already exists, you can login"
                );
                return res.status(409).json({
                    errors: [{ msg: "User already exists, you can login" }]
                });
            }

            const avatar = gravatar.url(email, { r: "pg", d: "mm" }, true);

            user = new User({
                name,
                email,
                password,
                avatar,
                loginType: "local"
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                id: user.id,
                email
            };

            // todo check expiration

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) {
                        logger.error(
                            `/login route - token signing error:${err}`
                        );
                        throw err;
                    }

                    res.json({
                        token,
                        success: true,
                        msg: "Registration is successful"
                    });
                }
            );
        } catch (error) {
            logger.error(`/register route - Server Error:${error}`);
            res.status(500).json({
                errors: [{ msg: "Server Error!, Try again later please" }]
            });
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Please include a valid email address").isEmail(),
        check("password", "Password is reqired").exists(),
        check("recaptcha", "Captcha code is invalid").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn("/login route validation errors");
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, recaptcha } = req.body;

        try {
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

            const recaptchaResponse = await axios.post(recaptchaUrl);

            if (!recaptchaResponse.data.success) {
                logger.warn("/login route - Recaptcha token is not valid");
                return res.status(400).json({
                    errors: [{ msg: "Recaptcha token is not valid" }]
                });
            }

            let user = await User.findOne({ email });

            if (!user) {
                logger.warn("/login route, User Doesn't exist");
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                logger.warn("/login route, password doesn't match");
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const payload = {
                id: user.id,
                email
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) {
                        logger.error(
                            `/login route - token signing error:${err}`
                        );
                        throw err;
                    }

                    res.json({ token, success: true, msg: "Login Successful" });
                }
            );
        } catch (error) {
            logger.error(`/register route - Server Error:${error}`);
            res.status(500).json({
                errors: [{ msg: "Server Error!, Try again later please" }]
            });
        }
    }
);

router.post("/login-with-google", async (req, res) => {
    const { googleResponse } = req.body;

    try {
        const payload = await verifyGoogleIDToken(googleResponse.tokenId);

        const { name, email } = payload;

        const profilePictureUrl = payload.picture;

        const token = googleResponse.tokenId;

        let user = await User.findOne({ email: payload.email });

        if (user && user.loginType === "local") {
            logger.warn(
                "/login-with-google route - User already exists, you can login with your local account"
            );
            return res.status(409).json({
                errors: [
                    {
                        msg:
                            "User already exists, you can login with your local account",
                        statusCode: 409
                    }
                ]
            });
        }

        if (!user) {
            user = new User({
                name,
                email,
                avatar: profilePictureUrl,
                googleAuthObj: googleResponse,
                loginType: "google"
            });

            await user.save();

            return res.json({
                token,
                success: true,
                msg: `Signup with Google is successful. ${name} Welcome to Darklyst`
            });
        }

        user.googleAuthObj = googleResponse;

        await user.save();

        res.json({
            token,
            success: true,
            msg: "Login with Google is successful"
        });
    } catch (error) {
        logger.error(
            `/login-with-google route -Authorization with Google Account denied: ${error}`
        );
        return res.status(401).json({
            msg: "Authorization with Google Account denied",
            success: false
        });
    }
});

router.post(
    "/change-password",
    [
        check("oldPassword", "Old Password is required").exists(),
        check(
            "password",
            "Please enter a password with 8 or more characters"
        ).isLength({ min: 8 }),
        check("confirm", "Please confirm your password")
            .exists()
            .custom((value, { req }) => value === req.body.password),
        check("recaptcha", "Captcha code is invalid").exists()
    ],
    auth,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.warn("/change-password route validation errors");
            return res.status(400).json({ errors: errors.array() });
        }

        const { oldPassword, password, recaptcha } = req.body;

        try {
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

            const recaptchaResponse = await axios.post(recaptchaUrl);

            if (!recaptchaResponse.data.success) {
                logger.warn("/change-password route validation errors");
                return res.status(400).json({
                    errors: [{ msg: "Recaptcha token is not valid" }]
                });
            }

            let user = await User.findOne({ email: req.user.email });

            if (!user) {
                logger.warn("/change-password route, User Doesn't exist");
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                logger.warn("/change-password route, password doesn't match");
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.json({
                success: true,
                msg: "Your password is changed successfully"
            });
        } catch (error) {
            logger.error(`/change-password route - Server Error:${error}`);
            res.status(500).json({
                errors: [{ msg: "Server Error!, Try again later please" }]
            });
        }
    }
);

router.post(
    "/password-reset-request",
    [
        check("email", "Please include a valid email address").isEmail(),
        check("recaptcha", "Captcha code is invalid").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.warn("/password-reset-request route validation errors");
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, recaptcha } = req.body;

        try {
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

            const recaptchaResponse = await axios.post(recaptchaUrl);

            if (!recaptchaResponse.data.success) {
                logger.warn(
                    "/password-reset-request route Recaptcha token is not valid"
                );
                return res.status(400).json({
                    errors: [{ msg: "Recaptcha token is not valid" }]
                });
            }

            let user = await User.findOne({ email });

            if (user) {
                const resetToken = await randomStringGenerator();

                user.passwordResetToken = resetToken;

                user.passwordResetExpiry = Date.now() + 86400000; // 24 hours = 86400000ms

                await user.save();

                let resetUrl = dev
                    ? "http://localhost:3000"
                    : "https://www.darklyst.com";

                resetUrl = `${resetUrl}/reset-password?reset_token=${resetToken}&email=${user.email}`;

                await passResetMailer(user.name, user.email, resetUrl);
                res.json({
                    success: true,
                    msg:
                        "An email has been sent to your email address with instructions to reset your password"
                });
            } else {
                noAccountPassResetMailer(user.email);
                res.json({
                    success: true,
                    msg:
                        "An email has been sent to your email address with instructions to reset your password"
                });
            }
        } catch (error) {
            logger.error(
                `/password-reset-request route - Server Error:${error}`
            );
            res.status(500).json({
                errors: [{ msg: "Server Error!, Try again later please" }]
            });
        }
    }
);

router.post(
    "/reset-token-verify",
    [
        check("email", "Invalid Credentials").isEmail(),
        check("resetToken", "Invalid Credentials").isLength({ min: 128 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.warn("/reset-token-verify route validation errors");
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, resetToken } = req.body;

        let user = await User.findOne({ email });

        try {
            if (!user) {
                logger.warn("/reset-token-verify route - User doesn't exist");
                return res.status(400).json({
                    errors: [{ msg: "This link has expired or it's invalid." }]
                });
            }

            if (!user.passwordResetToken || !user.passwordResetExpiry) {
                logger.warn(
                    "/reset-token-verify route - password reset token doesn't exist or password reset expiry doesn't exit for the user in the db"
                );
                return res.status(400).json({
                    errors: [{ msg: "This link has expired or it's invalid." }]
                });
            }

            if (
                user.passwordResetExpiry < Date.now() ||
                user.passwordResetToken !== resetToken
            ) {
                user.passwordResetToken = null;
                user.passwordResetExpiry = null;
                await user.save();

                logger.warn(
                    "/reset-token-verify route - password reset token doesn't match or password reset token expired"
                );
                return res.status(400).json({
                    errors: [{ msg: "This link has expired or it's invalid." }]
                });
            }

            if (
                user.passwordResetExpiry > Date.now() &&
                user.passwordResetToken === resetToken
            ) {
                res.json({ success: true });
            } else {
                throw new Error();
            }
        } catch (error) {
            logger.error(`/register route - Server Error:${error}`);
            res.status(500).json({
                errors: [{ msg: "Server Error!, Try again later please" }]
            });
        }
    }
);

router.post(
    "/reset-password",
    [
        check("email", "Invalid Credentials").isEmail(),
        check("resetToken", "Invalid Credentials").isLength({ min: 128 }),
        check(
            "password",
            "Please enter a password with 8 or more characters"
        ).isLength({ min: 8 }),
        check("confirm", "Please confirm your password")
            .exists()
            .custom((value, { req }) => value === req.body.password),
        check("recaptcha", "Captcha code is invalid").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.warn("/reset-password route validation errors");
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, resetToken, password, recaptcha } = req.body;

        let user = await User.findOne({ email });

        try {
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

            const recaptchaResponse = await axios.post(recaptchaUrl);

            if (!recaptchaResponse.data.success) {
                logger.warn(
                    "/reset-password route - Recaptcha token is not valid"
                );
                return res.status(400).json({
                    errors: [{ msg: "Recaptcha token is not valid" }]
                });
            }

            if (!user) {
                logger.warn("/reset-password route - User doesn't exist");
                return res.status(400).json({
                    errors: [{ msg: "This link has expired or it's invalid." }]
                });
            }

            if (!user.passwordResetToken || !user.passwordResetExpiry) {
                logger.warn(
                    "/reset-password route - password reset token doesn't exist or password reset expiry doesn't exit for the user in the db"
                );
                return res.status(400).json({
                    errors: [{ msg: "This link has expired or it's invalid." }]
                });
            }

            if (
                user.passwordResetExpiry < Date.now() ||
                user.passwordResetToken !== resetToken
            ) {
                user.passwordResetToken = null;
                user.passwordResetExpiry = null;
                await user.save();

                logger.warn(
                    "/reset-reset-password route - password reset token doesn't match or password reset token expired"
                );

                return res.status(400).json({
                    errors: [{ msg: "This link has expired or it's invalid." }]
                });
            }

            if (
                user.passwordResetExpiry > Date.now() &&
                user.passwordResetToken === resetToken
            ) {
                const salt = await bcrypt.genSalt(10);

                user.password = await bcrypt.hash(password, salt);

                await user.save();

                res.json({
                    success: true,
                    msg: "Your password is changed successfully"
                });
            } else {
                throw new Error();
            }
        } catch (error) {
            logger.error(`/register route - Server Error:${error}`);
            res.status(500).json({
                errors: [{ msg: "Server Error!, Try again later please" }]
            });
        }
    }
);

module.exports = router;
