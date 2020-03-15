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

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password -passwordResetToken -passwordResetExpiry");

		let userData = await user.populate("movieList").populate("showList").populate("personList").execPopulate();

		res.json(userData);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server Error");
	}
});

router.get("/verify", async (req, res) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied", success: false });
	}

	try {
		await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				res.status(401).json({ msg: "Token is not valid", success: false });
			} else {
				res.status(200).json({ msg: "Valid Token", success: true });
			}
		});
	} catch (error) {
		res.status(500).json({ msg: "Server Error", success: false });
	}
});

router.post(
	"/register",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email address").isEmail(),
		check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
		check("confirm", "Please confirm your password")
			.exists()
			.custom((value, { req }) => value === req.body.password),
		check("recaptcha", "Captcha code is invalid").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, recaptcha } = req.body;

		try {
			const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env
				.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

			const recaptchaResponse = await axios.post(recaptchaUrl);

			if (!recaptchaResponse.data.success) {
				return res.status(400).json({ errors: [ { msg: "Recaptcha token is not valid" } ] });
			}

			let user = await User.findOne({ email });

			if (user) {
				return res.status(409).json({ errors: [ { msg: "User already exists, you can login" } ] });
			}

			const avatar = gravatar.url(email, { r: "pg", d: "mm" });

			user = new User({
				name,
				email,
				password,
				avatar
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			// todo check expiration

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) {
					throw err;
				}

				res.json({ token, success: true, msg: "Registration is successful" });
			});
		} catch (error) {
			res.status(500).json({ errors: [ { msg: "Server Error!, Try again later please" } ] });
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
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password, recaptcha } = req.body;

		try {
			const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env
				.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

			const recaptchaResponse = await axios.post(recaptchaUrl);

			if (!recaptchaResponse.data.success) {
				return res.status(400).json({ errors: [ { msg: "Recaptcha token is not valid" } ] });
			}

			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [ { msg: "Invalid Credentials" } ] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [ { msg: "Invalid Credentials" } ] });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
				if (err) {
					throw err;
				}

				res.json({ token, success: true, msg: "Login Successful" });
			});
		} catch (error) {
			res.status(500).json({ errors: [ { msg: "Server Error!, Try again later please" } ] });
		}
	}
);

router.post(
	"/change-password",
	[
		check("oldPassword", "Old Password is required").exists(),
		check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
		check("confirm", "Please confirm your password")
			.exists()
			.custom((value, { req }) => value === req.body.password),
		check("recaptcha", "Captcha code is invalid").exists()
	],
	auth,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { oldPassword, password, recaptcha } = req.body;

		try {
			const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env
				.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

			const recaptchaResponse = await axios.post(recaptchaUrl);

			if (!recaptchaResponse.data.success) {
				return res.status(400).json({ errors: [ { msg: "Recaptcha token is not valid" } ] });
			}

			let user = await User.findById(req.user.id);

			if (!user) {
				return res.status(400).json({ errors: [ { msg: "Invalid Credentials" } ] });
			}

			const isMatch = await bcrypt.compare(oldPassword, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [ { msg: "Invalid Credentials" } ] });
			}

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			res.json({ success: true, msg: "Your password is changed successfully" });
		} catch (error) {
			res.status(500).json({ errors: [ { msg: "Server Error!, Try again later please" } ] });
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
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, recaptcha } = req.body;

		try {
			const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env
				.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

			const recaptchaResponse = await axios.post(recaptchaUrl);

			if (!recaptchaResponse.data.success) {
				return res.status(400).json({ errors: [ { msg: "Recaptcha token is not valid" } ] });
			}

			let user = await User.findOne({ email });

			if (user) {
				const resetToken = await randomStringGenerator();

				user.passwordResetToken = resetToken;

				user.passwordResetExpiry = Date.now() + 86400000; // 24 hours = 86400000ms

				await user.save();

				let resetUrl = dev ? "http://localhost:3000" : "https://www.darklyst.com";

				resetUrl = `${resetUrl}/reset-password?reset_token=${resetToken}&email=${user.email}`;

				await passResetMailer(user.name, user.email, resetUrl);
				res.json({
					success: true,
					msg: "An email has been sent to your email address with instructions to reset your password"
				});
			} else {
				noAccountPassResetMailer(user.email);
				res.json({
					success: true,
					msg: "An email has been sent to your email address with instructions to reset your password"
				});
			}
		} catch (error) {
			res.status(500).json({ errors: [ { msg: "Server Error!, Try again later please" } ] });
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
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, resetToken } = req.body;

		let user = await User.findOne({ email });

		try {
			if (!user) {
				return res.status(400).json({ errors: [ { msg: "This link has expired or it's invalid." } ] });
			}

			if (!user.passwordResetToken || !user.passwordResetExpiry) {
				return res.status(400).json({ errors: [ { msg: "This link has expired or it's invalid." } ] });
			}

			if (user.passwordResetExpiry < Date.now() || user.passwordResetToken !== resetToken) {
				user.passwordResetToken = null;
				user.passwordResetExpiry = null;
				await user.save();

				return res.status(400).json({ errors: [ { msg: "This link has expired or it's invalid." } ] });
			}

			if (user.passwordResetExpiry > Date.now() && user.passwordResetToken === resetToken) {
				res.json({ success: true });
			} else {
				throw new Error();
			}
		} catch (error) {
			res.status(500).json({ errors: [ { msg: "Server Error!, Try again later please" } ] });
		}
	}
);

router.post(
	"/reset-password",
	[
		check("email", "Invalid Credentials").isEmail(),
		check("resetToken", "Invalid Credentials").isLength({ min: 128 }),
		check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
		check("confirm", "Please confirm your password")
			.exists()
			.custom((value, { req }) => value === req.body.password),
		check("recaptcha", "Captcha code is invalid").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, resetToken, password, recaptcha } = req.body;

		let user = await User.findOne({ email });

		try {
			const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env
				.RECAPTCHA_SECRET_KEY}&response=${recaptcha}&remoteip=${req.connection.remoteAddress}`;

			const recaptchaResponse = await axios.post(recaptchaUrl);

			if (!recaptchaResponse.data.success) {
				return res.status(400).json({ errors: [ { msg: "Recaptcha token is not valid" } ] });
			}

			if (!user) {
				return res.status(400).json({ errors: [ { msg: "This link has expired or it's invalid." } ] });
			}

			if (!user.passwordResetToken || !user.passwordResetExpiry) {
				return res.status(400).json({ errors: [ { msg: "This link has expired or it's invalid." } ] });
			}

			if (user.passwordResetExpiry < Date.now() || user.passwordResetToken !== resetToken) {
				user.passwordResetToken = null;
				user.passwordResetExpiry = null;
				await user.save();

				return res.status(400).json({ errors: [ { msg: "This link has expired or it's invalid." } ] });
			}

			if (user.passwordResetExpiry > Date.now() && user.passwordResetToken === resetToken) {
				const salt = await bcrypt.genSalt(10);

				user.password = await bcrypt.hash(password, salt);

				await user.save();

				res.json({ success: true, msg: "Your password is changed successfully" });
			} else {
				throw new Error();
			}
		} catch (error) {
			res.status(500).json({ errors: [ { msg: "Server Error!, Try again later please" } ] });
		}
	}
);

module.exports = router;
