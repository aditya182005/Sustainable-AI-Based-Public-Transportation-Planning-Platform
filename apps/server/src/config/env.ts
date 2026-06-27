const dotenv = require("dotenv");

dotenv.config();

module.exports.config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "supersecret"
};
