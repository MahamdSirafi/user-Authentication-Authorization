---
inject: true
to: "./swagger/routes/users.js"
after: // property example
---
<% if (name === 'user') { -%>
<% if (kind === 'primitive' && type === 'string') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%>'<%= example %>'<% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'primitive' && type !== 'string') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%><%= example %><% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'enum') { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%>'<%= enumValue.split(" ")[0] %>'<% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% if (kind === 'reference' ) { -%>
<% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
<%= property %>Id: '673c40cd59e293827f79e398',
<% } -%>
<% if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
<%= property %>Ids: ['673c40cd59e293827f79e398','673c40cd59e293827f79e399'],
<% } -%>
<% } -%>
<% if (kind === 'object' ) { -%>
<%= property %>: <% if ( isArray) { -%>[<% } -%>{
// property example <%= property %>
} <% if ( isArray) { -%>]<% } -%>,
<% } -%>
<% }-%>