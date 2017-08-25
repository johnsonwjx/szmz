require('./sidebar.scss');
$.getJSON('business.do?action=getUserInfo', function(userInfo) {
  $('#welcome h4').html('欢迎您:' + userInfo.username + ' 角色:管理员');
  window.userInfo = userInfo;
}).fail(function() {
  Common.reLogin();
});
$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');
