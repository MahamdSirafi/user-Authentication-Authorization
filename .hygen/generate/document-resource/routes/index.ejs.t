---
to: "./routes/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Routes.js"
---
const <%=h.inflection.transform(name, ['underscore', 'dasherize']) %>Controller = require('../controllers/<%= h.inflection.transform(name, ['underscore', 'dasherize'])  %>Controller'); 
const {protect,restrictTo}= require('./../middlewares/authMiddlewers'); 
const express = require("express"); 
const router = express.Router();
router.use(protect); 
router.route("/").get( <%=h.inflection.transform(name, ['underscore', 'dasherize']) %>Controller.getAll<%= h.inflection.capitalize(name) %>)
.post(<%=  h.inflection.transform(name, ['underscore', 'dasherize'])%>Controller.create<%= h.inflection.capitalize(name) %>);
router .route("/:id") 
.get( <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Controller.get<%= h.inflection.capitalize(name) %>) 
.patch(<%= h.inflection.transform(name, ['underscore', 'dasherize'])%>Controller.update<%= h.inflection.capitalize(name) %>) 
.delete(<%= h.inflection.transform(name, ['underscore', 'dasherize'])%>Controller.delete<%= h.inflection.capitalize(name) %>) 
module.exports = router;
