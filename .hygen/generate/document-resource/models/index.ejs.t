---
to: ./models/<%=  name %>Model.js
---
const mongoose = require("mongoose"); 
const <%=  name %>Schema = new mongoose.Schema({ 
  // <creating-property-schema />
},
{ timestamps: true, versionKey: false });
// <creating-function-schema />
const <%= Name %> = mongoose.model("<%= Name %>",<%=  name %>Schema); 
module.exports = <%= Name %>;
