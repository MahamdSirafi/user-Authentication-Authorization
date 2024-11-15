---
inject: true
to: "./app.js"
after: //R
---
const <%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Router = require('./routes/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>Routes');