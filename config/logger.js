const winston = require("winston");
const transports = winston.transports;
const format = winston.format;
require("winston-daily-rotate-file");

const dailyRotateConfig = {
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
};

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
        new transports.DailyRotateFile({
            filename: "logs/winston-logs/error-%DATE%.log",
            level: "error",
            ...dailyRotateConfig
        }),
        new transports.DailyRotateFile({
            filename: "logs/winston-logs/combined-%DATE%.log",
            ...dailyRotateConfig
        })
    ],
    rejectionHandlers: [
        new transports.DailyRotateFile({
            filename: "logs/winston-logs/rejections-%DATE%.log",
            ...dailyRotateConfig
        })
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
