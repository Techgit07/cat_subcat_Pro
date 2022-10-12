const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;

const Admin = require('../models/adminModel');

var opt = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'knn'
}

passport.use(new jwtStrategy(opt, (jwtPayLoad, done) => {
    Admin.findById(jwtPayLoad._id, (err, users) => {
        if (err) {
            console.log('jwtID not found', +err);
            return false;
        }
        if (users) {
            return done(null, users)
        }
        else {
            return done(null, false)
        }
    })
}))

module.exports = passport