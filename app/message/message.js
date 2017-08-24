require('./message.scss');
var messageTmpl = require('./message.tmpl');
var TaskService = require('../services/task.js');
// var url = 'datas/message.json';
var $content = $('#message .message-content .list-content');
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
