require('./notify.scss');
var birthdayTmpl = require('./birthday.tmpl');
var expireTmpl = require('./expire.tmpl');
var $birthdayUl = $('#notify .tab-content>ul:eq(0)');
var $expireUl = $('#notify .tab-content>ul:eq(1)');
$birthdayUl.html(Common.status.loading);
var url = 'datas/notify.json';
$.getJSON(url, function(data) {
  var html = birthdayTmpl.render(data);
  $birthdayUl.html(html);
  html = expireTmpl.render(data);
  $expireUl.html(html);
  $birthdayUl.find('.gift').click(function() {
    swal('开发中...');
    return;
  });
}).fail(function() {
  $birthdayUl.html(Common.status.error);
  $expireUl.html(Common.status.error);
});
