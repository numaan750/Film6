// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({
//   storage,
// });



// import multer from 'multer';

// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// export default upload;



import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});


const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024 * 1024,

    fieldSize: 800 * 1024 * 1024,
  },
});
export default upload;