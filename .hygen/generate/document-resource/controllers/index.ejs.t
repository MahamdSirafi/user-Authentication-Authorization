---
to: "./controllers/<%= name %>Controller.js"
---
const <%= Name %>  = require('../models/<%=  name %>Model'); 
const AppError = require("../utils/appError"); 
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync"); 
exports.get<%= Name %>  = handlerFactory.getOne(<%= Name %>);
exports.create<%= Name %> = handlerFactory.createOne(<%= Name %>); 
exports.update<%= Name %> = handlerFactory.updateOne(<%= Name %>); 
exports.delete<%= Name %> =handlerFactory.deleteOne(<%= Name %>);
exports.getAll<%= Name %> = handlerFactory.getAll(<%= Name %>); 
