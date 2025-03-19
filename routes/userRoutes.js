const express = require('express');
const router = express.Router();
const App = require('../models/App'); // Import the App model

// Route to show all apps to users
router.get('/apps', async (req, res) => {
    try {
        const apps = await App.find(); // Fetch all apps
        res.render('apps', { apps }); // Render the user apps page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route for individual app details
router.get('/app/:id', async (req, res) => {
    try {
        const app = await App.findById(req.params.id); // Find app by ID
        if (!app) return res.status(404).send('App not found');
        res.render('appDetails', { app }); // Render app details page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
      
