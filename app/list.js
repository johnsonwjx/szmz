require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert2/dist/sweetalert2.css');
require('./scss/app.scss');
require('./scss/list.scss');
require('./scss/pagination.scss');
require('jquery');
require('./tab/tab.js');
require('./sidebar/sidebar.js');
require('./navbar/navbar.js');
require('jqPaginator/dist/1.2.0/jqPaginator.min.js');
var messageTmpl = require('message/message.tmpl');
var NewsUtil = require('./services/news.js');
var _ = require('lodash');

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
        getData && getData(num);
      }
    }
  });
}

$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');
var type = Common.param('type'),
  $content = $('.list-content'),
  $header = $('.list-header h4 em'),
  title = '列表',
  getData = function(page) {
    return Common.getJSON('business.do?action=loadNewsByPage&type=' + type + '&page=' + page, $content);
  };
switch (type) {
  case 'message':
    title = '通知公告列表';
    break;
  case 'business':
    title = '行业新闻列表';
    break;
  case 'company':
    title = '公司新闻列表';
    break;
  case 'big':
    title = '大事件列表';
    break;
  default:
    break;
}
document.title = title;
$header.html(title);
getData(1).then(function(data) {
  var html = messageTmpl.render({
    message: data.datas
  });
  $content.html(html);
  $content.find('.list-item').click(function() {
    var id = $(this).attr('newsid');
    var newsItem = _.find(data.datas, function(item) {
      return item.id == id;
    });
    NewsUtil.openDetail(newsItem);
    return false;
  });
  initPage(parseInt(data.page), parseInt(data.pagecount));
});
