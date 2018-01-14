const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/eventdb', { useMongoClient: true });

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    place: String,
    date: String,
    time: String,
    description: String,
    price: String,
    contact: String,
    eventPict: String
});

const Eventdb = mongoose.model("event", eventSchema);

module.exports = Eventdb