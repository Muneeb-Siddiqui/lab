require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const personRoutes = require('./routes/person');
const path = require('path'); // Import path module

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/person', personRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Replace 'public' with your frontend directory name
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));