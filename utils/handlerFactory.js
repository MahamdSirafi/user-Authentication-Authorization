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
exports.delete = (Model, filter) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany(filter);
    if (!doc) {
      return next(new AppError("No document found with that filter", 404));
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
exports.update = (Model, filter, update) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.updateMany(filter, update);
    res.status(200).json({
      status: "success",
      doc,
    });
  });
exports.delete = (Model, filter) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.updateMany(filter);
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
exports.statisticsWithLink = (Model, price, from, foreignField, ...field) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.aggregate([
      {
        $lookup: {
          from: from,
          localField: foreignField,
          foreignField: "_id",
          as: foreignField,
        },
      },
      {
        $project: {
          _id: 0,
          [price]: 1,
          [field[0]]: 1,
          [field[1]]: 1,
          [field[2]]: 1,
          [field[3]]: 1,
          [field[4]]: 1,
          [field[5]]: 1,
          [field[6]]: 1,
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
      },
      {
        $match: {
          year: {
            $gte: +req.params.year || 1970,
            $lte: +req.params.year || 3000,
          },
          month: {
            $gte: +req.params.month || 1970,
            $lte: +req.params.month || 3000,
          },
        },
      },
      {
        $group: {
          _id: `$${foreignField}`,
          count: { $sum: 1 },
          total: { $sum: `$${price}` },
          avg: { $avg: `$${price}` },
          max: { $max: `$${price}` },
          min: { $min: `$${price}` },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      doc,
    });
  });
