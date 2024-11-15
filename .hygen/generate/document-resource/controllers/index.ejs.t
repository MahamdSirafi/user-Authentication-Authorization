---
to: "./controllers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Controller.js"
---

const <%=h.inflection.capitalize(name) %>  = require('../models/<%= h.inflection.transform(name, ['underscore', 'dasherize'])
%>Model'); 
const AppError = require("../utils/appError"); 
const handlerFactory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync"); 
exports.get<%=h.inflection.capitalize(name) %>  = handlerFactory.getOne(<%=h.inflection.capitalize(name) %>);
exports.create<%= h.inflection.capitalize(name) %> = handlerFactory.createOne(<%=h.inflection.capitalize(name) %>); 
exports.update<%= h.inflection.capitalize(name) %> = handlerFactory.updateOne(<%=h.inflection.capitalize(name) %>); 
exports.delete<%= h.inflection.capitalize(name) %> =handlerFactory.deleteOne(<%=h.inflection.capitalize(name) %>);
exports.getAll<%= h.inflection.capitalize(name) %> = handlerFactory.getAll(<%=h.inflection.capitalize(name) %>); 
