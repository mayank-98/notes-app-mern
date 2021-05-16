require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/api/notes', noteRouter)

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, err => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
