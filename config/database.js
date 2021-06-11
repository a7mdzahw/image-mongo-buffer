const mongoose = require("mongoose");
const config = require("./config.json");

module.exports = async function () {
  try {
    const connection = await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb");
    return connection;
  } catch (error) {
    console.log("can't connect to mongodb");
  }
};
