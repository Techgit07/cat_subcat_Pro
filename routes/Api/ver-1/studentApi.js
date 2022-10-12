const express = require('express');

const routes = express.Router();

const studentController = require('../../../controller/Api/ver-1/Student_Controller');

routes.post('/createData', studentController.createData);

routes.get('/readData', studentController.readData);

routes.patch('/updateData/:id', studentController.updateData);

routes.delete('/deleteData/:id', studentController.deleteData);

module.exports = routes;