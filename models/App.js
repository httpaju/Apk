 
const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    downloadUrl: String
});

module.exports = mongoose.model('App', appSchema);
