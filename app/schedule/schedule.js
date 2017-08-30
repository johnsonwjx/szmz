require('./schedule.scss');
require('@fengyuanchen/datepicker/dist/datepicker.min.js');
require('@fengyuanchen/datepicker/dist/datepicker.css');
var scheduleTmpl = require('./schedule.tmpl');
var url = 'datas/schedules.json',
  $content = $('.list-content tbody'),
  $dateInput = $('[name="schedule-time"]');

$.fn.datepicker.languages['zh-CN'] = {
  format: 'yyyy年mm月dd日',
  days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  daysMin: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekStart: 1,
  startView: 0,
  yearFirst: true,
  yearSuffix: '年'
};
$dateInput.datepicker({
  autoShow: true,
  inline: true,
  container: '#calendar',
  language: 'zh-CN',
  format: 'yyyy-mm-dd',
  pick: getSchedule
});
$('#schedule .action').click(function() {
  swal('开发中...');
  return false;
});

function getSchedule() {
  var date = $dateInput.datepicker('getDate', true);
  Common.getJSON(url + '?date=' + date, $content).then(function(data) {
    data = $.map(data, function(item) {
      item.event = date + ',  ' + item.event;
      return item;
    });
    var html = scheduleTmpl.render({
      schedules: data
    });
    $content.html(html);
    $content.find('.edit').click(function() {
      swal('开发中...');
      return false;
    });

  });
}

$dateInput.datepicker('pick');
