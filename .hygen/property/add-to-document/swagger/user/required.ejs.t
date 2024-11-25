---
inject: true
to: "./swagger/routes/auth.js"
after: // required property
---
<% if (name === 'user') { -%>
<% if ((kind === 'reference' && referenceType === 'manyToOne' ) || kind === 'primitive') { -%>
<% if (isRequired) { -%>
'<%= property %>', 
<% }  -%>
<% } -%>
<% }-%>

