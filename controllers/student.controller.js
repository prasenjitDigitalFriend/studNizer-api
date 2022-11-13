const studentModel = require('../model/student.model.js');
const dateFormat = require('dateformat');

exports.create = (req, res) => {
    if (req.body.username && req.body.password && req.body.mobile && req.body.email && req.body.dept && req.body.sem && req.body.year && req.body.college && req.body.university) {
        if (req.body.mobile.toString().length != 10) {
            res.json({
                status: 'ERROR',
                message: 'Mobile Number Should Be 10 Digits Only',
                responscode: '500',
                data: null
            });
        } else {
            studentModel.mobilecheck(req.body.mobile, (errMobile, msgMobile, dataMobile) => {
                if (errMobile) {
                    res.json({
                        status: 'ERROR',
                        message: msgMobile,
                        responscode: '500',
                        data: dataMobile
                    });
                } else {
                    let dateTime = dateFormat(
                        new Date().toLocaleString('en-us', {
                            timeZone: 'Asia/Calcutta',
                        }),
                        'dd-mm-yyyy H:MM:ss'
                    )
                    let newStudent = new studentModel({
                        username: req.body.username,
                        password: req.body.password,
                        mobile: req.body.mobile,
                        profile_picture: req.body.profile_picture,
                        email: req.body.email,
                        dept: req.body.dept,
                        sem: req.body.sem,
                        year: req.body.year,
                        college: req.body.college,
                        university: req.body.university,
                        status: 1,
                        create_date: dateTime,
                        modified_date: dateTime,
                    });
                    studentModel.create(newStudent, (err, msg, data) => {
                        if (err) {
                            res.json({
                                status: 'ERROR',
                                message: msg,
                                responscode: '500',
                                data: null
                            });
                        } else {
                            res.json({
                                status: 'OK',
                                message: msg,
                                responscode: '200',
                                data: data
                            });
                        }
                    });
                }
            })
        }
    } else {
        res.json({
            status: 'ERROR',
            message: 'All Fields Are Required',
            responscode: '500',
            data: null
        });
    }
};

exports.login = (req, res) => {
    studentModel.login(req.body.username, req.body.password, (err, msg, data) => {
        if (err) {
            res.json({
                status: 'ERROR',
                message: msg,
                responscode: '500',
                data: null
            });
        } else {
            res.json({
                status: 'OK',
                message: msg,
                responscode: '200',
                data: data
            });
        }
    })
};

exports.update = (req, res) => {
    let dateTime = dateFormat(
        new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta',
        }),
        'dd-mm-yyyy H:MM:ss'
    )
    if (req.body.username && req.body.mobile && req.body.student_id && req.body.email && req.body.dept && req.body.sem && req.body.year && req.body.college && req.body.university) {
        studentModel.update(req.body.username, req.body.profile_picture, req.body.mobile, req.body.email, req.body.dept, req.body.sem, req.body.year, req.body.college, req.body.university, dateTime, req.body.student_id, req.body.student_id, (err, msg, data) => {
            console.log(dateTime);
            if (err) {
                res.json({
                    status: 'ERROR',
                    message: msg,
                    responscode: '500',
                    data: null
                });
            } else {
                res.json({
                    status: 'OK',
                    message: msg,
                    responscode: '200',
                    data: data
                });
            }
        })
    } else {
        res.json({
            status: 'ERROR',
            message: 'All Fields Are Required!',
            responscode: '500',
            data: null
        });
    }
};