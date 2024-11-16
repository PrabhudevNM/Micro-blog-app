//for storing in cloud
import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for direct upload to Cloudinary

const upload = multer({ storage });

export default upload;









// //for storing locally
// import multer from "multer"
// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });

// export default upload;
