const express = require('express');

const routes = express.Router();

const categoryPanel = require('../controller/category_Panel');

routes.get('/addCategory', categoryPanel.addCategory);

routes.post('/addcategoryData', categoryPanel.addcategoryData);

routes.get('/addsubCategory', categoryPanel.addsubCategory);

module.exports = routes;