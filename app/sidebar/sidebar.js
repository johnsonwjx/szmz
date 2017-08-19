require('./sidebar.scss')
var $ = require('jquery');
$('#tree .pure-menu-link').click(function() {
  debugger
  var $li = $($(this).parent());
  var hasChildren = $li.children('ul').length > 0;
  if (hasChildren) {
    $li.toggleClass('expand');
    $(this).children('i').toggleClass('fa-plus').toggleClass('fa-minus');
  }
})
