const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.checkOwner = (Model, fieldOwner, params) =>
  catchAsync(async (req, res, next) => {
    const thisDoc = await Model.findById(req.params[params]);
    if (req.user._id.toString() !== thisDoc[fieldOwner].toString()) {
      return next(new AppError("You are not the owner. Access is denied", 403));
    }
    next();
  });
