const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "Not token, authorization denied" });
	}

	try {
		await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				res.status(401).json({ msg: "Token is not valid" });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (error) {
		console.log("error in auth middleware");
		res.status(500).json({ msg: "Server Error" });
	}
};

module.exports = auth;
