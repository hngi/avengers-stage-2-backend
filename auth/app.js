import express from "express";
import cors from "cors";
import routes from "./routes";
import passport from "passport";
import session from "express-session";
import mongoose from 'mongoose';
import connectMongo from "connect-mongo";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config()
const app = express();

const MongoStore = connectMongo(session);

mongoose.connect(process.env.DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true
    }, (err, db) => {
        if(!err) {
            console.log('DB Connected');
        }
    }
)

var sess = {
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: true,
    cookie: {

    },
}

app.use(session(sess));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);


module.exports = app;


