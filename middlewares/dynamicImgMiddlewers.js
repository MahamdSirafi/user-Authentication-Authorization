const multer = require('multer');
const AppError = require('../utils/appError');
exports.uploadPhoto = (destination, filename, fileNameInModel) => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${filename}.${ext}`);
    },
  });
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  return upload.single(fileNameInModel);
};
