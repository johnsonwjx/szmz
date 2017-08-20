require('./tab.scss')
var $ = require('jquery');
$('.tab .tab-header .pure-menu-link').click(function() {
  var active = $(this).hasClass('active');
  if (active) {
    return
  }
  var $tab = $(this).parents('.tab');
  $tab.find('.active').removeClass('active');
  var $active = $(this).addClass('active');
  var index = $tab.find('.tab-header .pure-menu-link').index($active);
  $tab.find('.tab-content ul:eq(' + index + ')').addClass('active');
})
