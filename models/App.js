const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    downloadUrl: String,
});

module.exports = mongoose.model("App", AppSchema);
