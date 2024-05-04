const multer = require('multer');
const AppError = require('../utils/appError');
exports.uploadPhoto = (destination, fileNameInModel) => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/img/${destination}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${destination}-${file.originalname}`);
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
