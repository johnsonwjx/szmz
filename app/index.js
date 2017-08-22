require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert/dist/sweetalert.css');
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
}).fail(function() {
  Common.reLogin();
});
$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');


$('#close-system').click(Common.reLogin);
module.exports = {};
