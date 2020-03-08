const express = require("express");
const router = express.Router();
const axios = require("axios");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");
const gravatar = require("gravatar");

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

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

			const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

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

module.exports = router;
