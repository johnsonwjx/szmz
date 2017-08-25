require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert/dist/sweetalert.css');
require('./scss/app.scss');
require('./scss/list.scss');
require('./scss/pagination.scss');
require('./tab/tab.js');
require('./sidebar/sidebar.js');
require('./navbar/navbar.js');
require('jqPaginator/dist/1.2.0/jqPaginator.min.js');

function initPage(currentPage, totalPages) {
  $('#pagination').jqPaginator({
    totalPages: totalPages,
    visiblePages: 10,
    currentPage: currentPage,
    first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
    prev: '<li class="prev"><a href="javascript:void(0);"><i class="fa fa-angle-left"><\/i>上一页<\/a><\/li>',
    next: '<li class="next"><a href="javascript:void(0);">下一页<i class="fa fa-angle-right"><\/i><\/a><\/li>',
    last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
    onPageChange: function(num, type) {
      if (type === 'change') {
        getData(num);
      }
    }
  });
}

$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');
var type = Common.param('type'),
  $content = $('.list-content'),
  $header = $('.list-header h4 em'),
  title = '列表';
switch (type) {
  case 'message':
    var TaskService = require('services/task.js');
    var getData = function(page) {
      $content.html(Common.status.loadding);
      return TaskService.getTasks({
        taskType: 0,
        nowPage: page
      }, function(datas) {
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
    };
    title = '通知公告列表';
    var messageTmpl = require('message/message.tmpl');
    getData().then(function(rawData) {
      initPage(parseInt(rawData.page), parseInt(rawData.pagecount));
    });
    break;
  case 'news-business':
    title = '行业新闻列表';
    initPage(1, 10);
    break;
  case 'news-company':
    title = '公司新闻列表';
    initPage(1, 10);
    break;
  case 'news-big':
    title = '大事件列表';
    initPage(1, 10);
    break;
  default:
    break;
}
document.title = title;
$header.html(title);
