---
inject: true
to: "./models/<%=  name %>Model.js"
after: "// <creating-function-schema />"
---
<% if (kind === 'reference') { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= name %>Schema.pre(/^find/, function (next) {
  this.populate({
    path: '<%= property %>Id',
    select: '-_id',
  });
  next();
});<% } else { -%>
  <%= name %>Schema.pre(/^find/, function (next) {
  this.populate({
    path: '<%= property %>Ids',
    select: '-_id',
  });
  next();
});<% } -%><% } -%>