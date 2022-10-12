const Admin = require('../../../models/adminModel');

const jsonToken = require('jsonwebtoken');

module.exports.addData = async (req, res) => {
    try {
        if (req.body.password === req.body.cpassword) {
            let userEmail = await Admin.findOne({ email: req.body.email })
            if (userEmail) {
                return res.json({ 'message': 'email already registered' })
            }
            else {
                let data = await Admin.create(req.body)
                if (!data) {
                    return res.json({ 'message': 'admin data not added' })
                }
                else {
                    return res.json({ 'message': 'admin data added', 'data': data })
                }
            }
        }
        else {
            return res.json({ 'message': 'password not match' })
        }
    }
    catch (err) {
        return res.json({ 'message': 'something wrong' })
    }
}

module.exports.viewData = async (req, res) => {
    try {
        let data = await Admin.find({})
        if (data) {
            return res.json({ 'data': data })
        }
        else {
            return res.json({ 'message': 'admin data missing' })
        }
    }
    catch (err) {
        return res.json({ 'message': 'something wrong' })
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        let data = await Admin.findByIdAndDelete(req.params.id)
        if (!data) {
            return res.json({ 'message': 'admindata not deleted' })
        }
        else {
            return res.json({ 'message': 'admindata deleted' })
        }
    }
    catch {
        return res.json({ 'message': 'something wrong' })
    }
}

module.exports.updateData = async (req, res) => {
    try {
        let data = await Admin.findByIdAndUpdate(req.params.id, req.body)
        if (!data) {
            return res.json({ 'message': 'admindata not updated' })
        }
        else {
            return res.json({ 'message': 'admindata updated' })
        }
    }
    catch {
        return res.json({ 'message': 'something wrong' })
    }
}

module.exports.tokenGenerator = (req, res) => {
    Admin.findOne({ email: req.body.email }, (err, users) => {
        if (err) {
            return res.json({ 'message': 'email not match' })
        }
        if (!users || users.password != req.body.password) {
            return res.json({ 'message': 'password not match' })
        }
        let token = jsonToken.sign(users.toJSON(), 'knn', { expiresIn: 50000 })
        return res.json({ 'token': token })
    })
}