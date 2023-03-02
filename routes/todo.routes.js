const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.controller')

router.post('/all-todo/:page',todoController.allTodo);
router.post('/add-todo',todoController.addTodo);

module.exports = router;