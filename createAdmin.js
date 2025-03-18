require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define Admin Schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create Admin Model
const Admin = mongoose.model("Admin", adminSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB...");

        // Check if admin user already exists
        const existingAdmin = await Admin.findOne({ username: "admin" });
        if (existingAdmin) {
            console.log("Admin user already exists!");
            mongoose.connection.close();
            return;
        }

        // Hash password and create admin user
        const hashedPassword = bcrypt.hashSync("admin123", 10);
        await Admin.create({ username: "admin", password: hashedPassword });

        console.log("Admin user created successfully!");
        mongoose.connection.close();
    })
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
    });
