const express = require('express');
const passport = require('passport')

const routes = express.Router();

routes.use('/admin', require('./admin'));
routes.use('/category', require('./category'));

routes.use('/adminApi', require('./Api/ver-1/adminApi'));
routes.use('/studentApi', passport.authenticate('jwt', { failureRedirect: false }), require('./Api/ver-1/studentApi'));

routes.post('/upload', (req, res)=>{
    res.send("file upload")
})

module.exports = routes;