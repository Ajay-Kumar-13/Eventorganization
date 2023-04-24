const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    eventId:String,
    eventType:String,
    username:String
}, {timestamps:true})

const Like = mongoose.model("like", likeSchema);

module.exports = Like;