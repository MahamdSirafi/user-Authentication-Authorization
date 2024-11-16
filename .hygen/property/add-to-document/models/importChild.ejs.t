---
inject: true
to:  "./models/<%= h.inflection.transform(type||'user', ['underscore', 'dasherize']) %>Model.js"
at_line: 0
---
<% if (kind === 'reference' && deleteChildren ) { -%>
 const <%= h.inflection.capitalize(name)  %> = require('./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model');
<% } -%>