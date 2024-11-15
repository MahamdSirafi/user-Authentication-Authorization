---
inject: true
to: "./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model.js"
before: module.exports = <%= h.inflection.capitalize(name) %>;
---

<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Schema .virtual('<%= h.inflection.camelize(h.inflection.singularize(property), true) %>', {
    localField: '<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id',
    foreignField: '_id',
    ref: '<%= type %>',
    justOne: true,
  });
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Schema .virtual('<%= h.inflection.camelize(h.inflection.pluralize(property), true) %>', {
    localField: '<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids',
    foreignField: '_id',
    ref: '<%= type %>',
  });
  <% } -%>
<% } -%>
