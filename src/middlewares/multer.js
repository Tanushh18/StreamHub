import multer from "multer";
// 
const storage = multer.diskStorage({
    /**
     * Destination for multer to store the files.
     * This is a temporary directory where the files are stored.
     * The files are then uploaded to cloudinary.
     * param {Object} req - Express request object
     * param {Object} file - File object
     * param {Function} cb - Callback function
     * returns {void}
     * 
     * 
     */
    destination: function (req, file, cb) {
    cb(null, 'public/temp')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // null basically justifies that there is no error in uploading the file and second gives the file original name to the uploaded file.
      cb(null, file.originalname)   // it is not a good practice but the files will be on the local server for a very less time so it does not cause any problem to us. 
    }
})
// Export of the file.
export const upload = multer({ storage, })
