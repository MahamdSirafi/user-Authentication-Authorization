---
inject: true
to:  "./models/<%=  h.inflection.camelize(tupe) %>Model.js"
at_line: 0
---
<% if (kind === 'reference' && deleteChildren ) { -%>
 const <%= h.inflection.capitalize(name)  %> = require('./models/<%=  h.inflection.camelize(name) %>Model');
<% } -%>