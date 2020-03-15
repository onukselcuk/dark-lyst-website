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

const noAccountPassResetMailer = async (email) => {
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
			subject: `Reset password request on DarkLyst`,
			"h:Reply-To": "contact@darklyst.com",
			text: `Hey, someone requested to reset password with your email address on our website. If you made this request, we'd like to inform you that we could not find any account related to this email address. If you didn't make this request, you have nothing to worry about.`
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

module.exports = noAccountPassResetMailer;
