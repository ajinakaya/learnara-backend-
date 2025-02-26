const multer = require('multer');
const path = require('path');

// Set up storage configuration for different file types
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the file type and set the corresponding folder
    const fileType = file.mimetype.split('/')[0];
    let folder = 'uploads/';

    if (fileType === 'image') {
      folder = 'uploads/images';
    } else if (fileType === 'video') {
      folder = 'uploads/videos';
    } else if (fileType === 'audio') {
      folder = 'uploads/audio';
    }

    // Set the destination folder  based on the file type
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp and file extension
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Create a Multer instance with the storage configuration
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
  fileFilter: (req, file, cb) => {
    console.log("Uploaded file mimetype:", file.mimetype);
    // Define allowed file types for images, videos, and audio
    const fileTypes = {
      image: /jpeg|jpg|png|gif/,
      video: /mp4|mov|avi|mkv/,
      audio: /mp3|wav|mpeg|ogg|mp4|m4a|x-m4a/,  
    };

    // Determine the file type (image, video, or audio)
    const fileType = file.mimetype.split('/')[0];

    // Check if the file extension and mimetype match the allowed file types
    const extname = fileTypes[fileType]?.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes[fileType]?.test(file.mimetype);

    // If valid, allow the file, else return an error
    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    } else {
      // Reject the file if it's not of the allowed type
      cb(new Error('Invalid file type. Please upload an image, video, or audio.'));
    }
  },
});

module.exports = upload;




