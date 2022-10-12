const express = require('express');

const routes = express.Router();

const passport = require('passport');

const adminCntrl = require('../controller/admin_Panel');

routes.get('/', adminCntrl.dashboard);

routes.get('/fillForm', passport.checkAuthentication, adminCntrl.fillForm);

routes.post('/addData', adminCntrl.addData);

routes.get('/viewForm', passport.checkAuthentication, adminCntrl.viewForm);

routes.get('/removeData/:id', adminCntrl.removeData);

routes.get('/updateData/:id', passport.checkAuthentication, adminCntrl.updateData);

routes.post('/insertData', adminCntrl.insertData);

routes.get('/signUp', adminCntrl.signUp);

routes.post('/signupUser', adminCntrl.signupUser);

routes.get('/login', adminCntrl.login);

routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/admin/login' }), adminCntrl.loginUser);

routes.get('/error', adminCntrl.error);

routes.get('/logOut', adminCntrl.logOut);

routes.get('/changePassword', adminCntrl.changePassword);

routes.post('/confirmchangePassword', adminCntrl.confirmchangePassword);

routes.get('/lostPassword', adminCntrl.lostPassword);

routes.post('/forgotPassword', adminCntrl.forgotPassword);

routes.get('/otpPage', adminCntrl.otpPage);

routes.post('/checkOtp', adminCntrl.checkOtp);

routes.get('/setPassword', adminCntrl.setPassword);

routes.post('/recoverPassword', adminCntrl.recoverPasssword);

module.exports = routes;
