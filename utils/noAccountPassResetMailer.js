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

const noAccountPassResetMailer = async (email) => {
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
        },
        (error, info) => {
            if (error) {
                logger.error(
                    `No Account Password Reset Mailer Error: ${error}`
                );
            } else {
                logger.info(
                    `No Account Password Reset Mailer Response: ${info}`
                );
            }
        }
    );
};

module.exports = noAccountPassResetMailer;
