const express = require('express');
const app = express();
const port = process.env.port || 8000;

const morgan = require('morgan');
var cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config/main');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user');
const passportConfig = require('./config/passport')(passport);
const api = require('./routers/api');




app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Initialize and use passport
app.use(passport.initialize());

// Routes
app.use('/api', api);
// connect to DB
mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => {

    // we're connected!
    return console.log("Database accessed!");

})


// Homepage
app.get('/', (req, res) => {
    res.send("HNG Team-Avengers Task");
});


















app.listen(port, () => {
    console.log('App listening on port 8000!');
});