const todoModel = require('../model/todo.model');
const dateFormat = require('dateformat');

exports.allTodo = (req, res) => {
    let dateTime = dateFormat(
        new Date().toLocaleString("en-US", {
            timeZone: "Asia/Calcutta",
        }),
        "yyyy-mm-dd"
    );
    let todayDate = new Date(dateTime);
    let toDate;
    let fromDate;
    if (req.body.date == "DAILY") {
        fromDate = todayDate;
        toDate = new Date(todayDate.getTime() + 1 * 86400000);
    } else if (req.body.date == "YESTERDAY") {
        fromDate = new Date(todayDate.getTime() - 1 * 86400000);
        toDate = new Date(todayDate.getTime());
    } else if (req.body.date == "WEEKLY") {
        fromDate = new Date(todayDate.getTime() - 7 * 86400000);
        toDate = todayDate;
    } else if (req.body.date == "MONTHLY") {
        fromDate = new Date(todayDate.getTime() - 30 * 86400000);
        toDate = todayDate;
    } else if (req.body.date == "CUSTOM") {
        fromDate = req.body.fromDate;
        toDate = req.body.toDate;
    } else {
        toDate = null;
        fromDate = null;
    }
    if (toDate) {
        toDate = dateFormat(
            toDate.toLocaleString("en-US", {
                timeZone: "Asia/Calcutta",
            }),
            "yyyy-mm-dd"
        );
    }
    if (fromDate) {
        fromDate = dateFormat(
            fromDate.toLocaleString("en-US", {
                timeZone: "Asia/Calcutta",
            }),
            "yyyy-mm-dd"
        );
    }
    let page = req.params.page || 1;
    let start = (page - 1) * 10;
    let limit = 10;
    todoModel.count(
        req.body.student_id,
        req.body.search_data,
        req.body.status, toDate, fromDate,
        (errPagination, msgPagination, dataPagination) => {
            if (errPagination) {
                res.json({
                    status: "ERROR",
                    message: msgPagination,
                    responsecode: "500",
                    data: null,
                });
            } else {
                todoModel.allTodo(
                    req.body.student_id,
                    req.body.search_data,
                    req.body.status, toDate, fromDate,
                    start,
                    limit,
                    (err, msg, data) => {
                        if (err) {
                            res.json({
                                status: "ERROR",
                                message: msg,
                                responsecode: "500",
                                data: null,
                            });
                        } else {
                            res.json({
                                status: "OK",
                                message: msg,
                                responsecode: "200",
                                data: {
                                    data: data,
                                    pagination: {
                                        active_page: page,
                                        per_page: 10,
                                        total_items: dataPagination,
                                    },
                                },
                            });
                        }
                    }
                );
            }
        }
    );
};

exports.addTodo = (req, res) => {
    if (req.body.title && req.body.student_id) {
        todoModel.create(req.body.title, req.body.student_id, (err, msg, data) => {
            if (err) {
                res.json({
                    status: "ERROR",
                    message: msg,
                    responsecode: "500",
                    data: null,
                });
            } else {
                res.json({
                    status: "OK",
                    message: msg,
                    responsecode: "200",
                    data: null,
                });
            }
        })
    }
}