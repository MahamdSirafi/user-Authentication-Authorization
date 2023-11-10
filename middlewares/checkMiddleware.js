const Restaurant = require("../models/restaurantModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.checkOwner = catchAsync(async (req, res, next) => {
  const Restaurant = await Restaurant.findById(req.params.restaurantId);
  if (req.user._id != Restaurant.owner) {
    return next(new AppError("You are not the owner. Access is denied", 403));
  }
  next();
});
