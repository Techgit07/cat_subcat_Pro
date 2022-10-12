
const category = require('../models/category');
const subCategory = require('../models/subCategory');

module.exports.addCategory = function (req, res) {
    return res.render('Add_Category');
}

module.exports.addcategoryData = function (req, res) {
    category.create({
        category: req.body.category
    }, function (err) {
        if (err) {
            console.log("cat data not added" + err);
            return false;
        }
        return res.redirect('back');
    })
}

module.exports.addsubCategory = function (req, res) {
    category.find({}, function (err, data) {
        if (err) {
            console.log("data not found" + err);
            return false;
        }
        return res.render('subCategory', {
            'record': data
        });
    })
}

