---
to: "./routes/<%= name %>Routes.js"
---
const <%= name %>Controller = require('../controllers/<%=  name  %>Controller'); 
const {protect,restrictTo}= require('./../middlewares/authMiddlewers'); 
const express = require("express"); 
const router = express.Router();
router.use(protect); 
router.route("/").get( <%= name %>Controller.getAll<%= Name %>)
.post(<%= name %>Controller.create<%= Name %>);
router .route("/:id") 
.get( <%= name %>Controller.get<%= Name %>) 
.patch(<%= name%>Controller.update<%= Name %>) 
.delete(<%= name%>Controller.delete<%= Name %>) 
module.exports = router;
