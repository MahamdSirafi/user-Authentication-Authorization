exports.addQuery = (variableName, value) => {
  return (req, res, next) => {
    if (req.params[value]) value = req.params[value];
    if (value == "userId") value = req.user._id;
    req.query[variableName] = value;
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
    if (value == "userId") value = req.user._id;
    req.body[variableName] = value;
    next();
  };
};
