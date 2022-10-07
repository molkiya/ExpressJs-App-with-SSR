import multer from "multer"
import * as path from "path";

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './public/media'),
    filename: (req, file, callback) => callback(null, req.user.login + '-' + (Math.random()*100000) + path.extname(file.originalname))
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

export default multerConfig