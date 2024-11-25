---
inject: true
to:  "./models/<%=  type %>Model.js"
at_line: 0
---
<% if (kind === 'reference' && deleteChildren ) { -%>const <%= Name  %> = require('./<%=  name %>Model');<% } -%>