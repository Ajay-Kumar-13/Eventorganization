const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventType:String,
    cardTitle:String,
    cardText:String,
    fare:String,
    date:Number,
    month:String,
    image:String,
    venue:String,
    day:String,
    time:String,
    about:String,
    description:Array
}, {timestamps: true})

const event = mongoose.model("event", eventSchema);
module.exports = event;