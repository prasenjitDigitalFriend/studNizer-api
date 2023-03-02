const sql = require('./db.js');

const todo = function (data) {
    this.title = data.title,
        this.student_id = data.student_id,
        this.created_by = this.created_by
}

todo.count = (student_id, search_data, status, toDate, fromDate, result) => {
    let query =
        "SELECT count(todo_id) as total_todo FROM `todo` WHERE student_id=" + student_id;
    if (search_data) {
        query +=
            " AND title LIKE '%" + search_data + "%'";
    }
    if (status) {
        query += " AND status = " + status;
    }
    if (toDate || fromDate) {
        query += " AND todo.create_date > '" + fromDate + "' AND todo.create_date < '" + toDate + "'";
    }
    sql.query(query, (err, res) => {
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            if (res.length) {
                result(false, "Todo Count", res[0].total_todo);
                return;
            } else {
                result(false, "No Todo Found", 0);
            }
        }
    });
};

todo.allTodo = (student_id, search_data, status, toDate, fromDate, start, limit, result) => {
    let query =
        "SELECT * FROM `todo` WHERE student_id=" + student_id;
    if (search_data) {
        query +=
            " AND title LIKE '%" + search_data + "%'";
    }
    if (status) {
        query += " AND status = " + status;
    }
    if (toDate || fromDate) {
        query += " AND todo.create_date > '" + fromDate + "' AND todo.create_date < '" + toDate + "'";
    }
    query = query + " ORDER BY todo.todo_id DESC LIMIT " + start + ", " + limit;
    sql.query(query, (err, res) => {
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            if (res.length) {
                result(false, "All Todo List", res);
                return;
            } else {
                result(true, "Todo List Not Found", null);
                return;
            }
        }
    });
};

todo.create = (title, student_id, result) => {
    let query = "INSERT INTO `todo` SET title = '" + title + "' , student_id = '" + student_id + "', created_by = " + student_id;

    sql.query(query, (err, res) => {
        if (err) {
            result(true, err.message, null);
            return;
        } else {
            result(false, "New Todo Successfully");
            return;
        }
    });
}

module.exports = todo;