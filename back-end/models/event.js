const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/eventdb', { useMongoClient: true });

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    location: String,
    dateStart: String,
    dateEnd:String,
    timeStart: String,
    timeEnd:String,
    description: String,
    price: String,
    contact: String,
    eventPict: String,
    eventType:String,
    eventTopic:String
});

const Eventdb = mongoose.model("event", eventSchema);

module.exports = Eventdb