---
inject: true
to: "./app.js"
after: //ROUTES
---
app.use('/api/v1.0.0/<%= h.inflection.pluralize(name) %>', <%=  name %>Router);