---
inject: true
to: "./utils/enum.js"
after:  "<creating-enum-type />"
---
<% if (kind === 'enum') { -%>
exports.<%= enumType.replaceAll(' ','_')  %> = {
<% enumValue.split(" ").forEach(element => { -%>
  <%= element %> : '<%= element %>',
<% })  -%>
}
<%  } -%>
