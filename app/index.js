require('purecss');
require("font-awesome/scss/font-awesome.scss");
require('./scss/app.scss');
require('./tab/tab.js');
require('./sidebar/sidebar.js');
require('./navbar/navbar.js');
require('./news/news.js');
require('./message/message.js');
require('./finance/finance.js');
require('./contact/contact.js');
require('./calendar/calendar.js');
require('./task/task.js');
$.getJSON('business.do?action=getUserInfo', function(userInfo) {
  $('#welcome h4').html('欢迎您:' + userInfo.username + ' 角色:管理员');
  window.userInfo = userInfo;
}).fail(function(response) {
  if (response.responseText === '未登录') {
    window.location.href = Common.rootpath;
  }
});

function reLogin() {
  window.location.href = Common.rootpath + 'login.do?action=relogin';
}
$('#close-system').click(reLogin);

module.exports = {};
