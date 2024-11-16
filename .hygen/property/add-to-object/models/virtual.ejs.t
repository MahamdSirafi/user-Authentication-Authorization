---
inject: true
to: "./models/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Model.js"
after: "// <creating-function-schema />"
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Schema.pre(/^find/, function (next) {
  this.populate({
    path: '<%=object%>.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id',
    select: '-_id',
  });
  next();
});
  <% } else if (referenceType === 'oneToMany' || referenceType === 'manyToMany') { -%>
  <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Schema.pre(/^find/, function (next) {
  this.populate({
    path: '<%=object%>.<%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids',
    select: '-_id',
  });
  next();
});
  <% } -%>
<% } -%>
