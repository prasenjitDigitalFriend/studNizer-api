const multer = require("multer");
const dateFormat = require("dateformat");
const dotenv = require("dotenv").config();

exports.studentProfilePicUpload = (req, res) => {
    let maxSize = 5 * 1024 * 1024;
    const imageStorage = multer.diskStorage({
        destination: 'C:/Users/Prasenjit/Desktop/CollegeProject/imageUpload',
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname)
        }
    });
    let fileDetails = multer({
        storage: imageStorage, limits: { fileSize: maxSize }
    }).single("file_data");
    fileDetails(req, res, async (err) => {
        if (err) {
            return res.json({
                status: "error",
                message: err.message,
                responsecode: "500",
                data: null,
            });
        } else if (!req.file) {
            return res.json({
                status: "error",
                message: "File Not Selected",
                responsecode: "500",
                data: null,
            });
        } else {
            try {
                res.json({
                    status: "ok",
                    message: "File Upload Successfully",
                    responsecode: "200",
                    data: req.file.path,
                });
            } catch (e) {
                return res.json({
                    e,
                });
            }

        }
    })

}