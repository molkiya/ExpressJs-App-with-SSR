const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/media');
    },
    filename: function (req, file, callback) {
        let filename = req.user.login + '-' + (Math.random()*100000) + path.extname(file.originalname)
        callback(null, filename);
    },
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/mp4') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const multerConfig = multer({ storage: storage, fileFilter: fileFilter }).single('filedata')

module.exports = multerConfig;