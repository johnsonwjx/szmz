require('./message.scss');
var messageTmpl = require('./message.tmpl');
var TaskService = require('../services/task.js');
var $content = $('#message .message-content .list-content');
// TaskService.getTasks({
//   taskType: '0',
//   getnoftify: '1',
//   allnotify: '0'
// }, $content, messageTmpl).then(function(data) {
//   var html = messageTmpl.render(data);
//   $content.html(html);
// });
var data = {
  tasks: [{
    "title": "各位同事： 近期公司考察接待较多，请大家整理好桌面，并保持办公区域卫生整洁，感谢大家的支持与配合！",
    "date": "2017-01-12"
  }, {
    "title": "温馨提示：办公室改造期间，手机、钱包等贵重物品不要随意放在桌上。离开座位时，一定要锁入抽屉或随身携带！",
    "date": "2017-01-12"
  }, {
    "title": "各位同事： 近期公司考察接待较多，请大家整理好桌面，并保持办公区域卫生整洁，感谢大家的支持与配合！",
    "date": "2017-01-12"
  }, {
    "title": "温馨提示：办公室改造期间，手机、钱包等贵重物品不要随意放在桌上。离开座位时，一定要锁入抽屉或随身携带！",
    "date": "2017-01-12"
  }]
};
var html = messageTmpl.render(data);
$content.html(html);
$('#message .message-content .more').click(function() {
  window.open('list.html?type=message');
  return false;
});
