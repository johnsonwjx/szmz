require('./notify.scss');
var birthdayTmpl = require('./birthday.tmpl');
var expireTmpl = require('./expire.tmpl');
var $birthdayUl = $('#notify .tab-content>ul:eq(0)');
var $expireUl = $('#notify .tab-content>ul:eq(1)');
var url = 'datas/notify.json';
Common.getJSON(url, $('#notify .tab-content>ul')).then(function(data) {
  data = [];
  var html = birthdayTmpl.render(data);
  $birthdayUl.html(html);
  html = expireTmpl.render(data);
  $expireUl.html(html);
  $birthdayUl.find('.gift').click(function() {
    swal('开发中...');
    return;
  });
});
