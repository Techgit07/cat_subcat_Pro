const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: 'SSl',
    auth: {
        user: 'kaushalnena09@zohomail.in',
        pass: 'Zoho$123'
    }
})

module.exports = transport;