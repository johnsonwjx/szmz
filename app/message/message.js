require('./message.scss');
var messageTmpl = require('./message.tmpl');
var TaskService = require('../services/task.js');
var $content = $('#message .message-content .list-content');
TaskService.getTasks({
  taskType: '0',
  getnoftify: '1',
  allnotify: '0'
}, $content, messageTmpl).then(function(data) {
  var html = messageTmpl.render({
    data: data.tasks
  });
  $content.html(html);
});

$('#message .message-content .more').click(function() {
  window.open('list.html?type=message');
  return false;
});
