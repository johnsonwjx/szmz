var Mustache = require('mustache');
var $ = require('jquery');
var data = {
  menu: [{
    "item": "parent",
    "children": [{
      "item": "sub child",
      "children": [{
        "item": "sub sub child"
      }]
    }]
  }]
};

// var template = $("#template").html();
// var recurse = $("#recurse").html();
var parentTmpl = require('test/parent.tmpl');
var childTmpl = require('test/child.tmpl');
debugger;
var rendered = parentTmpl.render(data, {
  "recurse": childTmpl
});
$("body").html(rendered);
