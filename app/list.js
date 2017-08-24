require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert/dist/sweetalert.css');
require('./scss/app.scss');
require('./scss/list.scss');
require('./tab/tab.js');
require('./sidebar/sidebar.js');
require('./navbar/navbar.js');

var TaskService = require('services/task.js');
$.getJSON('business.do?action=getUserInfo', function(userInfo) {
  $('#welcome h4').html('欢迎您:' + userInfo.username + ' 角色:管理员');
  window.userInfo = userInfo;
}).fail(function() {
  Common.reLogin();
});
$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');
var type = Common.param('type'),
  $content = $('.list-content'),
  $header = $('.list-header h4 em'),
  title = '列表';
switch (type) {
  case 'message':
    title = '通知公告列表';
    var messageTmpl = require('message/message.tmpl');
    $content.html(Common.status.loadding);
    TaskService.getTasks("0", function(datas) {
      var html = messageTmpl.render({
        data: datas
      });
      $content.html(html);
      var $contentUl = $content.children('ul');
      $contentUl.find('.list-item').click(function() {
        var $item = $(this),
          id = $item.attr('taskid'),
          status = $item.attr('status'),
          fid = $item.attr('fid'),
          wtype = $item.attr('wtype');
        TaskService.openTask(id, status, fid, wtype, '0');
      });
    }, function() {
      $content.html(Common.status.error);
    }, true);
    break;
  case 'news-business':
    title = '行业新闻列表';
    break;
  case 'news-company':
    title = '公司新闻列表';
    break;
  case 'news-big':
    title = '大事件列表';
    break;
  default:
}
document.title = title;
$header.html(title);
