const mongoose = require("mongoose");

const userSchems = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  about: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: { type: String, required: true, minlength: 2 },
});

module.exports = mongoose.model("user", userSchems);
