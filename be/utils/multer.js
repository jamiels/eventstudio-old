const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Function to check if the file is a JPG
const isJpg = function (req, file, cb) {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension !== '.jpg') {
    return cb(new Error('Only JPG files are allowed'));
  }
  cb(null, true);
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generate UUID for unique filename
    cb(null, uniqueFilename + '.jpg'); // Force the file extension to be .jpg
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: isJpg // Apply the file filter
});

module.exports = upload;
