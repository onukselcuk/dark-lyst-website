const mongoose = require("mongoose");
const { logger } = require("./logger");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dark_lyst", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        logger.info("MongoDB connected...");
    } catch (error) {
        logger.error(`MongoDB connection Error: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDB;
