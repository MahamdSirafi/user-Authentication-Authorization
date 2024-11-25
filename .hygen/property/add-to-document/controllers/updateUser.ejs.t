---
inject: true
to: "./controllers/userController.js"
after:  //  property update
---
<% if (name === 'user') { -%>'<%= property %>',<% }-%>