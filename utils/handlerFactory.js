const catchAsync = require("./catchAsync");
const AppError = require("./appError");
const APIFeatures = require("./apiFeatures");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      doc,
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  });
exports.getOne2 = (Model, popOptions, popOptions2) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    if (popOptions2) query = query.populate(popOptions2);
    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let features =
      !req.query.agg && !req.query.aggDate
        ? new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        : new APIFeatures(Model, req.query).agg().aggDate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      doc,
    });
  });
exports.getAllpop = (Model, pop) =>
  catchAsync(async (req, res, next) => {
    let fullter = {};
    if (req.params.userId) fullter = { user: req.params.userId };
    let features = new APIFeatures(Model.find(), req.query);
    // console.log(pop);
    if (pop) {
      let pop2 = pop.split(" ");
      // console.log(pop2);
      // console.log(pop,' ++++++++++++++++++++++ ',pop.length);
      for (let i = 0; i < pop2.length; i++) {
        features.query = features.query.populate({
          path: `${pop2[i]}`,
        });
      }
    }
    features.filter().sort().limitFields().paginate();
    // console.log(features.query);
    // const doc = await features.query.explain();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      doc,
    });
  });

exports.getAllpop1 = (Model, pop) =>
  catchAsync(async (req, res, next) => {
    let features = new APIFeatures(Model.find(), req.query).filter();
    if (pop) {
      features.query = features.query.populate(pop);
    }
    features.sort().limitFields().paginate();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      doc,
    });
  });
exports.getAllpop2 = (Model, pop, pop2) =>
  catchAsync(async (req, res, next) => {
    let features = new APIFeatures(Model.find(), req.query).filter();
    if (pop) features.query = features.query.populate(pop);
    if (pop2) features.query = features.query.populate(pop2);
    features.sort().limitFields().paginate();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      doc,
    });
  });
