const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/eventdb', { useMongoClient: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
});

const Userdb = mongoose.model("user", userSchema);

module.exports = Userdb;