---
inject: true
to: "./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model.js"
after:  \<creating\-property\-schema \/\>
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= property %>Id: {
      type: mongoose.Schema.ObjectId,
      ref: '<%= h.inflection.capitalize(type) %>',
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
    <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids: {
      type: [{
        type: mongoose.Schema.ObjectId,
        ref: '<%= h.inflection.capitalize(type) %>',
        default: []
      }]
  <% } -%>
<% } else if (kind === 'enum') { -%>
  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>: {
      type: String,
      enum: Object.values(<%= enumType.replaceAll(' ','_') %>),
<% } else { -%>
    <%= property %>: {
      <% if (kind === 'object') { -%>
      // <creating-property-object />
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
 <% if ((kind === 'reference' && referenceType !== 'oneToMany' && referenceType !== 'manyToMany') || kind !== 'reference') { -%>
 <% if ( kind !== "object" && isRequired  ) { -%>
     required: [true, 'Please enter name  <%= property %>'],
<% } -%>
 <%  if (kind !=="enum" && kind !== "object" && isUnique  ) { -%>
     unique: true,
<% } -%>
<% } -%>
},