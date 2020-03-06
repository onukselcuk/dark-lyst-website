const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/dark_lyst", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		console.log("MongoDB connected...");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
