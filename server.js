
// Import required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const appRoutes = require('./routes/appRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

const App = require('./models/App');

// Show Dashboard with App List
app.get('/dashboard', async (req, res) => {
  const apps = await App.find();
  res.render('dashboard', { apps });
});

// Show Edit Form
app.get('/admin/edit/:id', async (req, res) => {
  const appData = await App.findById(req.params.id);
  res.render('edit', { app: appData });
});

// Handle Update Request
app.post('/admin/edit/:id', async (req, res) => {
  const { name, downloadUrl } = req.body;

  if (!isValidApkUrl(downloadUrl)) {
    return res.send('Invalid APK URL. Must end with .apk');
  }

  await App.findByIdAndUpdate(req.params.id, { name, downloadUrl });
  res.redirect('/dashboard');
});

// Handle Delete Request
app.get('/admin/delete/:id', async (req, res) => {
  await App.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/', appRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
