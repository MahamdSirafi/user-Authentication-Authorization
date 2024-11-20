---
inject: true
to: "./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model.js"
after:  \<creating\-property\-schema \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id: {
      type: mongoose.Schema.ObjectId,
      ref: '<%= h.inflection.titleize(type) %>',
       <%  if  ( referenceType === 'oneToOne')  { -%>
     unique: true,
<% } -%>
  <% } else  { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: {
      type: [{
        type: mongoose.Schema.ObjectId,
        ref: '<%= h.inflection.titleize(type) %>',
        default: []
      }]
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: <% if (isArray) {-%>[ <% }-%>{
      type: String,
      enum: Object.values(<%= enumType.replaceAll(' ','_') %>),
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
     required: [true, 'Please enter name  <%= property %>'],
<% } -%>
 <%  if  (kind === 'primitive' && isUnique)  { -%>
     unique: true,
<% } -%>
<% } -%>
}
<% if (kind !== 'reference' && isArray) {-%>] <% }-%>
,