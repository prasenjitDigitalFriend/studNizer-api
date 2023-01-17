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
    let query = "SELECT mobile,username FROM `student` WHERE (mobile = '" + username + "' OR username ='" + username + "' ) AND password = '" + password + "'";
    sql.query(query, (err, res) => {
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

student.update = (username, profilePic, mobile, email, dept, sem, year, college, university, modifiedDate, modifiedBy, studentId, result) => {
    let query = "UPDATE `student` SET username ='" + username + "', profile_picture = '" + profilePic + "', mobile = '" + mobile + "',email = '" + email + "', dept = '" + dept + "' , sem = " + sem + ", year = " + year + " , college = '" + college + "' , university = '" + university + "' , modified_date = '" + modifiedDate + "' , modified_by =" + modifiedBy + " WHERE student_id=" + studentId;

    sql.query(query, (err, res) => {
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            if (res.affectedRows > 0) {
                result(false, "Student Details Updated Successfully !", null);
                return;
            } else {
                result(true, "Student Details Updating Failed", null);
                return;
            }
        }
    })
};

module.exports = student;