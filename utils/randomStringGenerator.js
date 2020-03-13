const crypto = require("crypto");

const randomStringGenerator = () => {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(128, (err, buf) => {
			if (err) {
				reject(err);
			} else {
				const token = buf.toString("hex");
				resolve(token);
			}
		});
	});
};

module.exports = randomStringGenerator;
