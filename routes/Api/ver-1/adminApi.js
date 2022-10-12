const express = require('express');
const passport = require('passport');

const routes = express.Router();

const adminController = require('../../../controller/Api/ver-1/Admin_Controller');

routes.post('/addData', adminController.addData);

routes.get('/viewData', adminController.viewData);

routes.delete('/deleteData/:id', adminController.deleteData);

routes.put('/updateData/:id', adminController.updateData);

routes.post('/tokenGenerator', adminController.tokenGenerator);

module.exports = routes
