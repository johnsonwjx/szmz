require('./task.scss');
var taskTmpl = require('./task.tmpl');
var TaskService = require('../services/task.js');
var loaded = [];

function loadTab(index, taskType) {
  if ($.inArray(index, loaded) !== -1) {
    return;
  }

  var $contentUl = $('#tasks .tab-content ul:eq(' + index + ')');
  $contentUl.html(Common.status.loadding);
  TaskService.getTasks({
    taskType: taskType
  }, function(datas) {
    var html = taskTmpl.render({
      data: datas
    });
    $contentUl.html(html);
    $contentUl.find('.list-item').click(function() {
      var $item = $(this),
        id = $item.attr('taskid'),
        status = $item.attr('status'),
        fid = $item.attr('fid'),
        wtype = $item.attr('wtype');
      TaskService.openTask(id, status, fid, wtype, taskType);
      return false;
    });
    $contentUl.siblings().removeClass('active');
    $contentUl.addClass('active');
    loaded.push(index);
  }, function() {
    $contentUl.html(Common.status.error);
  });
}

$('#tasks .tab-header .pure-menu-link').click(function() {
  var $current = $(this);
  var taskType = $current.attr('taskType');
  var index = $('#tasks .tab-header .pure-menu-link').index($current);
  loadTab(index, taskType);
});


//初始化
loadTab(0, '0');
