const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: String,
        required: true
    }
})

const subCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategory;