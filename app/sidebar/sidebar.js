require('./sidebar.scss');
$.getJSON('business.do?action=getUserInfo', function(userInfo) {
  $('#welcome h4').html('欢迎您:' + userInfo.username + ' 角色:'+userInfo.rolename);
  window.userInfo = userInfo;
}).fail(function() {
  Common.reLogin();
});
$('#sidebar iframe').on('load', function() {
  $(this).contents().find('#tree').css({
    position: 'absolute',
    top: 0,
    bottom: '50px',
    height: ''
  });
});
$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');
