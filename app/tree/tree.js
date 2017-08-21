require('./tree.scss');

function nodeClick() {
  var $li = $($(this).parent());
  var hasChildren = $li.children('ul').length > 0;
  if (hasChildren) {
    $li.toggleClass('expand');
    $(this).children('.oper').toggleClass('fa-plus').toggleClass('fa-minus');
  }
}
module.exports = {
  nodeClick: nodeClick
}
