---
inject: true
to:  "./models/<%= h.inflection.transform(type || 'user', ['underscore', 'dasherize']) %>Model.js"
after: "// <creating-function-schema />"
---
<% if (kind === 'reference' && deleteChildren ) { -%>
  <% if (referenceType === 'oneToOne' || referenceType === 'manyToOne') { -%>
  <%= h.inflection.transform(type, ['underscore', 'dasherize']) %>Schema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await  <%= h.inflection.capitalize(name)  %>.deleteMany({  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Id: doc._id });
    } catch (error) {
      return next(new AppError("error deleting <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>s", 500));
    }
  }
});
  <% } else { -%>
  <%= h.inflection.transform(type, ['underscore', 'dasherize']) %>Schema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      await  <%= h.inflection.capitalize(name)  %>.deleteMany({  <%= h.inflection.camelize(h.inflection.singularize(property), true) %>Ids:{$in: doc._id} });
    } catch (error) {
      return next(new AppError("error deleting <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>s", 500));
    }
  }
});
  <% } -%>
<%  console.log("mas") %>
<% } -%>
