---
inject: true
to: "./models/<%=  name %>Model.js"
at_line: 0
skip_if:  <%  if (kind === 'enum') { -%>  const { <%= enumType %> } = require('../utils/enum') <% } -%>
---
<% if (kind === 'enum') { -%>const {<%= enumType %> } = require('../utils/enum');<% } -%>