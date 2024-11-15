---
inject: true
to: "./app.js"
after: //ROUTES
---
app.use('/api/v1.0.0/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>', <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Router);