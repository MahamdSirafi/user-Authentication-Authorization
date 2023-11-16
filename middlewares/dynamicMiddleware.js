exports.addQuery = (variableName, value) => {
  return (req, res, next) => {
    let newValue;
    if (req.params[value]) newValue = req.params[value];
    if (value == "userId") newValue = req.user._id;
    req.query[variableName] = newValue || value;
    next();
  };
};
exports.addBody = (value) => {
  return (req, res, next) => {
    req.body = value;
    next();
  };
};
exports.addVarBody = (variableName, value) => {
  return (req, res, next) => {
    let newValue;
    if (value == "userId") newValue = req.user._id;
    req.body[variableName] = newValue || value;
    next();
  };
};
exports.filteredBody =
  (...allowedFields) =>
  (req, res, next) => {
    const newObj = {};
    Object.keys(req.body).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = req.body[el];
    });
    req.body = newObj;
    next();
  };
exports.setPathImginBody =
  (folder, ...filedImg) =>
  (req, res, next) => {
    if (req.file) {
      req.body[filedImg] = `${req.protocol}://${req.get(
        "host"
      )}/img/${folder}/${req.file.filename}`;
    } else {
      filedImg.forEach((item) => {
        if (req.files[item])
          req.body[item] = `${req.protocol}://${req.get(
            "host"
          )}/img/${folder}/${req.files[item][0].filename}`;
        console.log(req.body);
      });
    }
    next();
  };
