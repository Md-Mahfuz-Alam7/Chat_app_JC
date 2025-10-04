const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    }
    catch(error) {
        console.log("MongoDB connection error:", error);
        throw error;
    }
};

module.exports = connectDB;