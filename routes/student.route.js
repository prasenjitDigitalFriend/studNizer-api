const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student.controller.js');
const uploadController = require('../controllers/upload.controller.js');

router.post('/create-student',studentController.create);
router.post('/login',studentController.login);
router.post('/profile-pic-upload',uploadController.studentProfilePicUpload);

module.exports = router;