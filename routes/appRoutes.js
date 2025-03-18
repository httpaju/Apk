 
const express = require('express');
const router = express.Router();
const App = require('../models/App');

router.get('/', async (req, res) => {
    const apps = await App.find();
    res.render('index', { apps });
});

module.exports = router;
