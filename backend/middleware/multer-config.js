const multer = require('multer');//allow to manage incoming files

//Mime types to generate file extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//specify where to save incoming files
const storage = multer.diskStorage({//tell multer to save on disk
  destination: (req, file, callback) => {//tell multer where to save incoming files
    callback(null, 'images');//name of the folder where to save incoming files
  },
  filename: (req, file, callback) => {//tell multer which files names to use to avoid files to have the same name
    const name = file.originalname.split(' ').join('_');//generate new name
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');