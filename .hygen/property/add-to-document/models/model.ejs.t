---
inject: true
to: "./models/<%= name %>Model.js"
after:  \<creating\-property\-schema \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id: {
      type: mongoose.Schema.ObjectId,
      ref: '<%= Type %>',
       <%  if  ( referenceType === 'oneToOne')  { -%>
     unique: true,
<% } -%>
  <% } else  { -%>
    <%= property %>Ids: {
      type: [{
        type: mongoose.Schema.ObjectId,
        ref: '<%= Type %>',
        default: []
      }]
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= property %>: <% if (isArray) {-%>[ <% }-%>{
      type: String,
      enum: Object.values(<%= enumType %>),
<% } else { -%>
    <%= property %>: <% if (isArray) {-%>[ <% }-%>{
      <% if (kind === 'object') { -%>
      // <creating-property-object-<%= property %> />
      <% }-%>
      <% if (kind !== 'object') { -%>
      <% if (type === 'string') { -%>
      type: String,
      <% } else if (type === 'number') { -%>
      type: Number,
    <% } else if (type === 'boolean') { -%>
      type: Boolean,
      <% } -%>
      <% } -%>
<% } -%>
 <% if ((kind === 'reference' && referenceType === 'manyToOne' ) || kind === 'primitive') { -%>
 <% if ( isRequired  ) { -%>
     required: [true, 'Please enter <%= property %>'],
<% } -%>
 <%  if  (kind === 'primitive' && type === 'string' && isUnique)  { -%>
     unique: true,
<% } -%>
<% } -%>
}
<% if (kind !== 'reference' && isArray) {-%>] <% }-%>
,