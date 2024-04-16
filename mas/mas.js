const fs = require('fs');
const path = require('path');
const models = require('./models');
createName = process.argv[3];
if (process.argv[2] == 'all' || process.argv[2] == 'm') {
  models.crateModel(createName);
}
if (process.argv[2] == 'all' || process.argv[2] == 'c') {
  //2) crate file controllers
  if (!fs.existsSync('./controllers')) {
    fs.mkdirSync('./controllers');
  }
  const fileNamecontroller = path.join(
    './controllers',
    createName + 'Controller' + '.js'
  );
  const codecontroller = `const ${
    createName[0].toUpperCase() + createName.slice(1)
  } = require("../models/${createName + 'Model'}");
const AppError = require("../utils/appError");
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
exports.get${createName} = handlerFactory.getOne(${
    createName[0].toUpperCase() + createName.slice(1)
  });
exports.create${createName} = handlerFactory.createOne(${
    createName[0].toUpperCase() + createName.slice(1)
  });
exports.update${createName} = handlerFactory.updateOne(${
    createName[0].toUpperCase() + createName.slice(1)
  });
exports.delete${createName} = handlerFactory.deleteOne(${
    createName[0].toUpperCase() + createName.slice(1)
  });
exports.getAll${createName} = handlerFactory.getAll(${
    createName[0].toUpperCase() + createName.slice(1)
  });
exports.defult = catchAsync(async (req, res, next) => {
  //write your code here
  const doc = []
  if(!doc){
    return (new AppError("Message Error",400))
    }
  res.status(200).json({
    status: "success",
    doc,
  });
});
`;
  fs.writeFileSync(fileNamecontroller, codecontroller, 'utf8');
}
if (process.argv[2] == 'all' || process.argv[2] == 'r') {
  //2) crate file routes
  if (!fs.existsSync('./routes')) {
    fs.mkdirSync('./routes');
  }
  const fileNameRouter = path.join('./routes', createName + 'Router' + '.js');
  const codeRouter = `const ${createName}Controller = require("../controllers/${
    createName + 'Controller'
  }");
  const authMiddlewers = require('./../middlewares/authMiddlewers');
  const express = require("express");
  const router = express.Router();
  router.use(authMiddlewers.protect);
  router.route("/").get(${createName}Controller.getAll${createName}).post(${createName}Controller.create${createName});
  router
    .route("/:id")
    .get(${createName}Controller.get${createName})
    .patch(${createName}Controller.update${createName})
    .delete(${createName}Controller.delete${createName});
  module.exports = router;
  `;
  fs.writeFileSync(fileNameRouter, codeRouter, 'utf8');
}
//4)update app
if (process.argv[2] == 'all' || process.argv[2] == 'r') {
  let fileContent = fs.readFileSync('./app.js', 'utf8');
  let instructionToAdd = `const ${createName}Router= require('./routes/${createName}Router')`;
  let startIndex = fileContent.indexOf('const userRouter');
  if (startIndex !== -1) {
    let endIndex = fileContent.indexOf('\n', startIndex);
    if (endIndex !== -1) {
      fileContent =
        fileContent.slice(0, endIndex + 1) +
        instructionToAdd +
        '\n' +
        fileContent.slice(endIndex + 1);
    }
  }
  fs.writeFileSync('./app.js', fileContent, 'utf8');
  instructionToAdd = `app.use('/api/v1.0.0/${createName}s', ${createName}Router);`;
  startIndex = fileContent.indexOf("app.use('/', userRouter)");
  if (startIndex !== -1) {
    endIndex = fileContent.indexOf('\n', startIndex);
    if (endIndex !== -1) {
      fileContent =
        fileContent.slice(0, endIndex + 1) +
        instructionToAdd +
        '\n' +
        fileContent.slice(endIndex + 1);
    }
  }
  fs.writeFileSync('./app.js', fileContent, 'utf8');
}
