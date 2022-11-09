const sql = require('./db.js');

const student = function (data) {
    this.username = data.username,
        this.password = data.password,
        this.profile_picture = data.profile_picture,
        this.mobile = data.mobile,
        this.email = data.email,
        this.dept = data.dept,
        this.sem = data.sem,
        this.year = data.year,
        this.college = data.college,
        this.university = data.university,
        this.status = data.status;
}

student.create = (newStudent, result) => {
    sql.query('INSERT INTO `student` SET ?', newStudent, (err, res) => {
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            result(false, 'New Student Added Successfully', {
                username: newStudent.username,
                password: newStudent.password,
                mobile: newStudent.mobile
            });
            return;
        }
    })
};

student.mobilecheck = (mobile, result) => {
    sql.query("SELECT mobile FROM `student` WHERE mobile= ?", mobile, (err, res) => {
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            if (res.length) {
                result(true, "Mobile Number Already Exist", null);
                return;
            } else {
                result(false, "New Number", null);
                return;
            }
        }
    });
};

student.login = (username, password, result) => {
    let query = ("SELECT mobile,username,password FROM `student` WHERE (mobile = '" + username + "' OR username ='" + username + "' ) AND password = '" + password + "'");
    sql.query(query,(err,res)=>{
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            if (res.length) {
                result(false, "Login Successfully", res[0]);
                return;
            } else {
                result(true, "Login Failed", null);
                return;
            }
        } 
    })
}

module.exports = student;