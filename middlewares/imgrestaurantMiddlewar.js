const multer = require("multer");
const AppError = require("../utils/appError");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/restaurants");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `${
        file.fieldname == "logo"
          ? `restaurant-${req.user.id}-logo-${Date.now()}.${ext}`
          : `restaurant-${req.user.id}-cover-${Date.now()}.${ext}`
      }`
    );
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadRestaurantPhoto = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);
