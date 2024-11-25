---
inject: true
to: "./swagger/routes/<%= name %>Swagger.js"
after: // required property
---
<% if ((kind === 'reference' && referenceType === 'manyToOne' ) || kind === 'primitive') { -%>
<% if (isRequired) { -%>
'<%= property %>', 
<% }  -%>
<% } -%>
