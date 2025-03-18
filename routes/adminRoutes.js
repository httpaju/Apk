

const express = require('express');
const router = express.Router();
const App = require('../models/App'); // Make sure this is your model




// Admin login page
router.get('/login', (req, res) => res.render('login'));

// Handle login (simple authentication)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'ajmal' && password === 'ajmalajmal123') {
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.send('Invalid login credentials');
    }
 

});

// Admin dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    res.render('dashboard');
try {
        const apps = await App.find(); // Fetch apps from DB
        res.render('dashboard', { apps }); // Pass apps to dashboard.ejs
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add app
router.post('/add', async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    const { name, description, imageUrl, downloadUrl } = req.body;
    await App.create({ name, description, imageUrl, downloadUrl });
    res.redirect('/admin/dashboard');
});


module.exports = router;
