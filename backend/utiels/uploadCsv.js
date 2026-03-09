import multer from 'multer'
import path from 'path'



const storage = multer.memoryStorage()

const csvUpload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 2 
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!['.csv'].includes(ext)) {
            return cb(new Error('file is not csv'), false);
        }
        cb(null, true);
    }
})

export default csvUpload