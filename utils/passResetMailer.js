const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const { logger } = require("../config/logger");

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: "mg.darklyst.com"
    },
    host: "api.eu.mailgun.net"
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const passResetMailer = async (name, email, url) => {
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
        },
        (error, info) => {
            if (error) {
                logger.error(`Password Reset Mailer Error: ${error}`);
            } else {
                logger.info(`Password Reset Mailer Response: ${info}`);
            }
        }
    );
};

module.exports = passResetMailer;
