const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const signUp = require('../models/signupUser');

passport.use(new localStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    signUp.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            console.log("email not found");
            return done(err);
        }
        if (!user || user.password !== password) {
            console.log("password not match");
            return done(null, false);
        }
        return done(null, user);
    })
}))

passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    signUp.findById(id, function (err, user) {
        if (err) {
            console.log("user_id not found");
            return done(null, false);
        }
        return done(null, user);
    })
})

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/admin/login');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;