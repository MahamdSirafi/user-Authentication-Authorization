---
to: ./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model.js
---

const mongoose = require("mongoose"); 
const <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Schema = new mongoose.Schema({ 
  // <creating-property-schema />
},
{ timestamps: true, versionKey: false });
const <%= h.inflection.capitalize(name) %> = mongoose.model("<%= h.inflection.capitalize(name) %>",<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Schema); 
module.exports = <%= h.inflection.capitalize(name) %>;