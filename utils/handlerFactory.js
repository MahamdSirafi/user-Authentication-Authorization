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
exports.getOne = (Model, ...popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions)
      for (let i = 0; i < popOptions.length; i++)
        query = query.populate(popOptions[i]);
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
    const doc = await features.query;
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
    if (pop) {
      let pop2 = pop.split(" ");
      for (let i = 0; i < pop2.length; i++) {
        features.query = features.query.populate({
          path: `${pop2[i]}`,
        });
      }
    }
    features.filter().sort().limitFields().paginate();
    const doc = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      doc,
    });
  });
exports.getAllpop1 = (Model, ...pop) =>
  catchAsync(async (req, res, next) => {
    let features = new APIFeatures(Model.find(), req.query).filter();
    if (pop) {
      for (let i = 0; i < pop.length; i++)
        features.query = features.query.populate(pop[i]);
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
exports.getField = (Model, field, filter) =>
  catchAsync(async (req, res, next) => {
    if (filter && req.params[Object.values(filter)[0]]) {
      const keys = Object.keys(filter);
      const firstKey = keys[0];
      filter[firstKey] = req.params[Object.values(filter)[0]];
    }
    const arrOpj = await Model.find(filter, { [field]: 1, _id: 0 });
    arrOpj.forEach((item, index) => {
      arrOpj[index] = item[field];
    });
    let doc = [...new Set(arrOpj)];
    res.status(200).json({
      status: "success",
      results: doc.length,
      doc: doc,
    });
  });
