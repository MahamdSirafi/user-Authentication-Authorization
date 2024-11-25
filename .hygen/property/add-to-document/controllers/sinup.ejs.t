---
inject: true
to: "./controllers/authController.js"
after:  //  property signup
---
<% if (name === 'user') { -%><%= property %>:req.body.<%= property %>,<% }-%>
