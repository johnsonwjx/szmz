require('./task.scss');
var taskTmpl = require('./task.tmpl');
var url = Common.rootpath + 'loadMain.do?action=loadTaskByAjax?taskType=';
$.getJSON(url, function(data) {
  debugger;
});
