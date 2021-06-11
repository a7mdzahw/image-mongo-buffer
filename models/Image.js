const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: Buffer,
});

const Image = mongoose.model("Image", schema);

module.exports = {
  Image,
};
