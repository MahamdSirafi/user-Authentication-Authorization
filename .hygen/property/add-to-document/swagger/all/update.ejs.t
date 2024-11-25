---
inject: true
to: "./swagger/routes/<%= name %>Swagger.js"
after: // update property
---
<% if(!hiddenSwagger){ -%>
<%= property %>: { type: <% if ( isArray) {-%>
'array',items: {type:<% } -%>
<% if (kind === 'primitive') { -%>'<%= type %>',<% 
}else if (kind !== 'object'){-%>'string',<% } -%>
<% if (kind === 'enum') 
{-%> enum: [<% enumValue.split(" ").forEach(element => {-%>'<%= element %>',<% }) -%>]  <% } -%>
<% if ( isArray && kind !== 'object') { -%>} <% } -%>
<% if (kind !== 'object') {  -%>},<% }  -%>
<% if (kind === 'object') {  -%>
'object',properties: {
//  update properties <%= property %>
}   
<% if ( isArray) { -%> } <% } -%> },<% }  -%>
<% } -%>