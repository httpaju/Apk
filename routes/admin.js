const express = require("express");
const router = express.Router();

const ADMIN_USERNAME = "ajmal";  
const ADMIN_PASSWORD = "ajmalajmal123";  

// Login Page
router.get("/login", (req, res) => {
    res.render("login"); // Ensure login.ejs exists in the "views" folder
});

// Login Authentication
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log("Received credentials:", username, password); // Debugging

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        return res.redirect("/admin/dashboard");
    } else {
        return res.send("Invalid login credentials");
    }
});

// Admin Dashboard (Protected Route)
router.get("/dashboard", (req, res) => {
    if (!req.session.isAdmin) {
        return res.redirect("/admin/login");
    }
    res.send("Welcome to the Admin Dashboard!");
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login");
    });
});

module.exports = router;
