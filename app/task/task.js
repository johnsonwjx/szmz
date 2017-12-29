require('./task.scss');
var taskTmpl = require('./task.tmpl');
var TaskService = require('../services/task.js');
var loaded = [];

function loadTab(index, taskType) {
  var $contentUl = $('#tasks .tab-content ul:eq(' + index + ')');
  $contentUl.addClass('active');
  if ($.inArray(index, loaded) !== -1) {
    return;
  }
  $contentUl.html(Common.status.loadding);
  TaskService.getTasks({
    taskType: taskType
  }, $contentUl, taskTmpl).always(function () {
    loaded.push(index);
  });
}

$('#tasks .tab-header .pure-menu-link').click(function () {
  var $current = $(this);
  var taskType = $current.attr('taskType');
  var index = $('#tasks .tab-header .pure-menu-link').index($current);
  $(this).parents('.tab').find('.active').removeClass('active');
  $(this).addClass('active');
  loadTab(index, taskType);

});

//初始化
loadTab(0, '0');
