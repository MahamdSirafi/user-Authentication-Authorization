---
inject: true
to: "./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model.js"
at_line: 0
skip_if:  <%  if (kind === 'enum') { -%>  const { <%= enumType %> } = require('../utils/enum') <% } -%>
---
<% if (kind === 'enum') { -%>
  const {<%= enumType.replaceAll(' ','_') %> } = require('../utils/enum');
<% } -%>