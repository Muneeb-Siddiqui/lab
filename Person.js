const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    education: String,
    experience: String
});

module.exports = mongoose.model('Person', PersonSchema);