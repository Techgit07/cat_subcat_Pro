const Student = require('../../../models/studentModel');

module.exports.createData = async (req, res) => {
    try {
        let stdemail = await Student.findOne({ email: req.body.email })
        if (stdemail) {
            return res.json({ 'message': 'student email already registered' })
        }
        let data = await Student.create(req.body)
        if (!data) {
            return res.json({ 'message': 'student data not added' })
        }
        else {
            return res.json({ 'message': 'student data added on database' })
        }
    }
    catch {
        return res.json({ 'message': 'something wrong' })
    }
}

module.exports.readData = async (req, res) => {
    try {
        let data = await Student.find({});
        if (!data) {
            return res.json({ 'message': 'studentdata not found' });
        }
        else {
            return res.json({ 'message': 'studentdata found', 'data': data });
        }
    }
    catch {
        return res.json({ 'message': 'something wrong' });
    }
}

module.exports.updateData = async (req, res) => {
    try {
        let data = await Student.findByIdAndUpdate(req.params.id, req.body);
        if (data) {
            return res.json({ 'message': 'studentdata updated' })
        }
        else {
            return res.json({ 'message': 'studentdata not updated' })
        }
    }
    catch {
        return res.json({ 'message': 'something wrong' });
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        let data = await Student.findByIdAndDelete(req.params.id)
        if (data) {
            return res.json({ 'message': 'studentdata deleted' })
        }
        else {
            return res.json({ 'message': 'studentdata not deleted' })
        }
    }
    catch {
        return res.json({ 'message': 'something wrong' });
    }
}