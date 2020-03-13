const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const auth = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: "mg.darklyst.com"
	},
	host: "api.eu.mailgun.net"
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const passResetMailer = async (name, email, url) => {
	// function firstLetterUp (string) {
	// 	if (string.split(" ").length > 1) {
	// 		let nameArray = string.toLowerCase().split(" ");
	// 		for (let i = 0; i < nameArray.length; i++) {
	// 			nameArray[i] = nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1);
	// 		}
	// 		return nameArray.join(" ");
	// 	} else {
	// 		return string.charAt(0).toUpperCase() + string.slice(1);
	// 	}
	// }

	// const contextObject = {
	// 	patientName: firstLetterUp(name)
	// };

	await nodemailerMailgun.sendMail(
		{
			from: "recovery-no-reply@darklyst.com",
			to: email,
			subject: `Reset your password on DarkLyst`,
			"h:Reply-To": "contact@darklyst.com",
			text: `Dear ${name}, You can reset your password by going to this link ${url}`
			// template: {
			// 	name: "mailToPatient.ejs",
			// 	engine: "ejs",
			// 	context: contextObject
			// }
		}
		// (err, info) => {
		// 	if (err) {
		// 		console.log(`Error:${err}`);
		// 	} else {
		// 		console.log(`Response: ${info}`);
		// 	}
		// }
	);
};

module.exports = passResetMailer;
