const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password:String,
  mobile: Number,
  owner: Boolean
}, { timestamps: true });

// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
