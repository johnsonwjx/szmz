require('./sidebar.scss')
var Tree = require('../tree/tree.js');
var treeTmpl = require('./tree.tmpl');
var childrenTmpl = require('./children.tmpl');
// var url = 'datas/func.json';
var url = Common.rootpath + 'loadFunc.do?action=getFuncJsonBynewDesktop2';
var icons = ['fa-user', 'fa-briefcase', 'fa-dot-circle-o', 'fa-bank', 'fa-money'];
$.getJSON(url, function(funcs) {
  var nodes = [],
    codeObjMap = {};
  $.each(funcs, function(index, item) {
    var parentNode = item.parentcode ? codeObjMap[item.parentcode] : null;
    item.children = [];
    if (parentNode) {
      parentNode.children.push(item);
    } else {
      nodes.push(item);
    }
    codeObjMap[item.code] = item;
  });
  codeObjMap = null;
  var html = treeTmpl.render({
    nodes: nodes
  }, {
    children: childrenTmpl
  });
  $('#sidebar .tree').html(html)
  $('#sidebar .tree .pure-menu-link').click(function() {
    Tree.nodeClick.call(this);
    debugger;
    var $node = $(this);
    var url = $node.attr('url');
    if (url) {
      window.open(Common.rootpath + url);
    }
  });
  $('#sidebar .tree .level1 .icon').each(function(index, item) {
    $(item).addClass(icons[index])
  });
})
