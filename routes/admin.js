const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const App = require("../models/App");

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin && bcrypt.compareSync(password, admin.password)) {
        req.session.admin = admin;
        res.redirect("/admin/dashboard");
    } else {
        res.send("Invalid login credentials");
    }
});

router.get("/dashboard", (req, res) => {
    if (!req.session.admin) return res.redirect("/admin/login");
    res.render("dashboard");
});

router.post("/add-app", async (req, res) => {
    if (!req.session.admin) return res.redirect("/admin/login");

    const { title, description, imageUrl, downloadUrl } = req.body;
    await App.create({ title, description, imageUrl, downloadUrl });
    res.redirect("/admin/dashboard");
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
});

module.exports = router;
