---
inject: true
to:  "./models/<%=  type %>Model.js"
after: "// <creating-function-schema />"
---
<% if (kind === 'reference' && deleteChildren ) { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%=  type %>Schema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await  <%= Name  %>.deleteMany({  <%= property %>Id: doc._id });
    } catch (error) {
      return next(new AppError("error deleting <%= h.inflection.pluralize(name) %>s", 500));
    }
  }
});<% } else { -%>
  <%=  type %>Schema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await  <%= Name  %>.deleteMany({  <%= property %>Ids:{$in: doc._id} });
    } catch (error) {
      return next(new AppError("error deleting <%= h.inflection.pluralize(name) %>s", 500));
    }
  }
});<% } -%><% } -%>
