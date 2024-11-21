---
inject: true
to: "./swagger/swagger.js"
at_line: 1
---
const { <%= Name %>, create<%= Name %>, update<%= Name %> } = require('./routes/<%= name %>Swagger');