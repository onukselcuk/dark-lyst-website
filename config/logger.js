const winston = require("winston");
const transports = winston.transports;
const format = winston.format;

const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: "dark-lyst-logger" },
    transports: [
        new transports.File({
            filename: "logs/winston-logs/error.log",
            level: "error"
        }),
        new transports.File({ filename: "logs/winston-logs/combined.log" })
    ],
    rejectionHandlers: [
        new transports.File({ filename: "logs/winston-logs/rejections.log" })
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.simple()
            )
        })
    );
}

module.exports = {
    logger,
    transports,
    format
};
