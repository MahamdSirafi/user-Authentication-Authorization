---
to: "./routes/<%= name %>Routes.js"
---
const <%= name %>Controller = require('../controllers/<%=  name  %>Controller'); 
const {protect,restrictTo}= require('./../middlewares/authMiddlewers'); 
const {RoleCode}= require('./../utils/enum'); 
const {<%=  allRole %>}= RoleCode; 
const express = require("express"); 
const router = express.Router();
router.use(protect); 
router.route("/").get( 
restrictTo(<%=   roleGet %>),
<%= name %>Controller.getAll<%= Name %>)
.post(restrictTo(<%=  rolePost %>),
<%= name %>Controller.create<%= Name %>);
router .route("/:id") 
.get(restrictTo(<%=  roleGet %>),
<%= name %>Controller.get<%= Name %>) 
.patch(restrictTo(<%=  roleUpdate %>),
<%= name%>Controller.update<%= Name %>) 
.delete(restrictTo(<%=  roleDelete %>),
<%= name%>Controller.delete<%= Name %>) 
module.exports = router;
