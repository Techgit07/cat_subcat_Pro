
const panels = require('../models/panel');
const signUp = require('../models/signupUser');

const nodemailer = require('../config/nodemailer');

module.exports.dashboard = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('dashboard');
    }
    return res.redirect('/admin/login');
}

module.exports.fillForm = function (req, res) {
    return res.render('fillForm');
}

module.exports.addData = function (req, res) {
    panels.create(req.body, function (err) {
        if (err) {
            console.log('dataBase not added' + err);
            return false;
        }
        return res.redirect('/admin/fillForm');
    })
}

module.exports.viewForm = function (req, res) {
    panels.find({}, function (err, data) {
        if (err) {
            console.log("dataBase not found" + err);
            return false;
        }
        return res.render('viewForm', {
            'data': data
        });
    })
}

module.exports.removeData = function (req, res) {
    panels.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log("dataBase not remove" + err);
            return false;
        }
        return res.redirect('/admin/viewForm');
    })
}


module.exports.updateData = function (req, res) {
    panels.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("dataBase not found" + err);
            return false;
        }
        return res.render('update_Data', {
            'single': data
        })
    })
}

module.exports.insertData = function (req, res) {
    panels.findByIdAndUpdate(req.body.id, {
        'name': req.body.name,
        'contact': req.body.contact,
        'email': req.body.email,
        'message': req.body.message
    }, function (err, data) {
        if (err) {
            console.log("dataBase not update" + err);
            return false;
        }
        return res.redirect('/admin/viewForm');
    })
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin')
    }
    return res.render('signUp', { layout: 'signUp' });
}

module.exports.signupUser = function (req, res) {
    if (req.body.password == req.body.cpassword) {
        signUp.create(req.body, function (err) {
            if (err) {
                console.log("user not signUp");
                return false
            }
            return res.redirect('/admin/login');
        })
    }
    else {
        return res.redirect('/admin/error');
    }
}

module.exports.error = function (req, res) {
    return res.render('error', { layout: 'error' });
}

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin')
    }
    return res.render('login', { layout: 'login' });
}

module.exports.loginUser = function (req, res) {
    return res.redirect('/admin');
}

module.exports.logOut = function (req, res) {
    req.logOut(function (err) {
        if (err) {
            console.log("logout error" + err);
            return false;
        }
        return res.redirect('/admin/login');
    })
}

module.exports.changePassword = function (req, res) {
    return res.render('change_Password');
}

module.exports.confirmchangePassword = function (req, res) {
    var current = req.user.password;

    var currentp = req.body.currentp;
    var newp = req.body.newp;
    var confirmp = req.body.confirmp;
    if (current == currentp) {
        if (currentp != newp) {
            if (confirmp == newp) {

                signUp.findByIdAndUpdate(req.user.id, {
                    password: newp,
                    cpassword: newp
                }, function (err, data) {
                    if (err) {
                        console.log("password not changed" + err);
                        return false;
                    }
                    return res.redirect('/admin/logOut');
                })
            }
            else {
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        return res.redirect('back');
    }
}

module.exports.lostPassword = function (req, res) {
    return res.render('lostPassword', { layout: 'lostPassword' })
}

module.exports.forgotPassword = function (req, res) {
    signUp.findOne({
        email: req.body.email
    }, function (err, signupData) {
        if (err) {
            console.log("email not foud" + err);
            return false;
        }
        if (signupData) {

            var otp = Math.random();
            otp = parseInt(otp * 100000)
            console.log(otp);
            res.cookie('otp', otp);
            res.cookie('email', req.body.email);

            nodemailer.sendMail({
                from: 'kaushalnena09@zohomail.in',
                to: req.body.email,
                subject: 'OTP Verify',
                html: "Your OTP Is :" + otp

            }, function (err, data) {
                if (err) {
                    console.log("otp not send" + err);
                    return false;
                }
                console.log("otp send");
                return res.redirect('/admin/otpPage')
            })
        }
        else {
            return res.redirect('back');
        }
    })
}

module.exports.otpPage = function (req, res) {
    return res.render('otpPage', { layout: 'otpPage' });
}

module.exports.checkOtp = function (req, res) {
    if (req.body.formotp == req.cookies.otp) {
        return res.redirect('/admin/setPassword');
    }
    else {
        console.log('wrong otp');
        return res.redirect('/admin/error');
    }
}

module.exports.setPassword = function (req, res) {
    return res.render('setPassword', { layout: 'setPassword' });
}

module.exports.recoverPasssword = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        signUp.findOne({ email: req.cookies.email }, function (err, data) {
            signUp.findByIdAndUpdate(data.id, {
                password: req.body.npass,
                cpassword: req.body.cpass
            }, function (err, data) {
                if (err) {
                    console.log("password not matched");
                    return false;
                }
                res.cookie('otp', '');
                res.cookie('email', '');
                return res.redirect('/admin');
            })
        })
    }
    else {
        return res.redirect('back');
    }
}

