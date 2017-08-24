require('./contact.scss');
var Tree = require('../tree/tree.js');
var treeTmpl = require('./tree.tmpl');
var childrenTmpl = require('./children.tmpl');
var url = 'datas/contact.json';
$.getJSON(url, function(data) {
  var html = treeTmpl.render({
    nodes: data
  }, {
    children: childrenTmpl
  });
  $('#contact .tree').html(html);
  $('#contact .tree .pure-menu-link').click(Tree.nodeClick);
});

var searchInput = $('#contract-search');
$('#contract-search-btn').click(function() {
  var txt = searchInput.val().trim();
  swal('开发中...');
});
