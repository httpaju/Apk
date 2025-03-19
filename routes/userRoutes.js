const express = require('express');
const router = express.Router();
const App = require('../models/App');

// Home Page (List Apps)
router.get('/', async (req, res) => {
    try {
        let searchQuery = req.query.search || '';
        let apps;

        if (searchQuery) {
            apps = await App.find({ name: { $regex: searchQuery, $options: 'i' } }); // Case-insensitive search
        } else {
            apps = await App.find(); // Fetch all apps
        }

        res.render('index', { apps, searchQuery });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// App Details Page
router.get('/app/:id', async (req, res) => {
    try {
        const app = await App.findById(req.params.id);
        if (!app) return res.status(404).send('App not found');

        // Get 3 random suggested apps (excluding the current one)
        const suggestedApps = await App.aggregate([
            { $match: { _id: { $ne: app._id } } }, // Exclude current app
            { $sample: { size: 3 } } // Get 3 random apps
        ]);

        res.render('app-details', { app, suggestedApps });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
