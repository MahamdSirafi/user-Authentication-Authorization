---
inject: true
to: "./swagger/routes/auth.js"
after:  //  property signup
---
<% if (name === 'user') { -%>
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
//  create  properties <%= property %>
}   
<% if ( isArray) { -%> } <% } -%> },<% }  -%>
<% } -%>
<% }-%>