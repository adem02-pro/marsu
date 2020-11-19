// Package imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const Strategy = require('passport-local').Strategy

// Local imports
const router = require('./api/v1')
const Marsupilami = require('./api/models/marsupilami')

// App basic settings
const app = express()
app.set('port', (process.env.port || 3000))
app.use(cors({credentials: true, origin: 'http://localhost:4200'}))
app.use(bodyParser.json())

// Passport configuration
app.use(cookieParser())
app.use(session({
    secret: 'My secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, cb) => {
    cb(null, user);
})
passport.deserializeUser((user, cb) => {
    cb(null, user)
})

passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, (name, pwd, cb) => {
    Marsupilami.findOne({username: name}, (err, marsu) => {
        if(err)
            console.log(`Could not find ${name} in DB`, err);
        // If query succeed but doesn't find user
        else if (!marsu) {
            console.log(`could not find marsu`);
            cb(null, false)
        }
        else if(marsu.password !== pwd) {
            console.log(`wrong password for marsu: ${name}`);
            cb(null, false)
        } else {
            console.log(`marsu authenticated`, marsu);
            cb(null, marsu)
        }
    })
}))

// Using routes
app.use('/api/v1', router);

// Error pages handling 
app.use((req, res) => {
    const err = new Error(`404 - Not found`)
    err.status = 404
    res.status(err.status).json(err.message)
})

// Connection to DB and if it works, connect to server
mongoose.connect('mongodb://localhost:27017/MarsuDB', {useNewUrlParser : true}, (err) => {
    if(!err) {
        console.log(`Connection to Database succeeded :)`);
        app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}`))
    }
    else console.log(`Connection to Database failed :(`);
})