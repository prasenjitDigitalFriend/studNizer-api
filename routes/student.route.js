const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student.controller.js');

router.post('/create-student',studentController.create);

module.exports = router;