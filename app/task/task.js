require('./task.scss');
var taskTmpl = require('./task.tmpl');
var _tasktype = '0',
  loaded = [];

function getTasks(callback) {
  var url = Common.rootpath + 'loadMain.do?action=loadTaskByAjax&taskType=' + _tasktype + '&taskGpType=D&filter=';
  $.getJSON(url, function(rawData) {
    var datas = [];
    if (rawData.titleinfo.length > 0) {
      var items = rawData.data[rawData.titleinfo[0][0]];
      datas = $.map(items, function(itemArr) {
        var timeArr = itemArr[3].split(' ');
        return {
          id: itemArr[0],
          title: itemArr[2],
          date: timeArr[0],
          time: timeArr[1],
          person: itemArr[4],
          status: itemArr[5],
          fid: itemArr[8],
          wtype: itemArr[9]
        };
      });
    }
    callback(datas);
  });
}
$('#tasks .tab-header .pure-menu-link').click(function() {
  var $current = $(this);
  _tasktype = $current.attr('taskType');
  var index = $('#tasks .tab-header .pure-menu-link').index($current);
  loadTab(index);
});

function loadTab(index) {
  if ($.inArray(index, loaded) !== -1) {
    return;
  }
  loaded.push(index);
  getTasks(function(datas) {
    var html = taskTmpl.render({
      data: datas
    });
    var $contentUl = $('#tasks .tab-content ul:eq(' + index + ')');
    $contentUl.html(html);
    $contentUl.children('li').click(function() {
      var $item = $(this),
        id = $item.attr('taskid'),
        status = $item.attr('status'),
        fid = $item.attr('fid'),
        wtype = $item.attr('wtype');
      openTask(id, status, fid, wtype);
    });
    $contentUl.siblings().removeClass('active');
    $contentUl.addClass('active');
  });
}
//初始化
loadTab(0);


function openTask(id, st, fid, wtype) {
  var url = Common.rootpath + "flow.do?taskID=" + id + "&taskStatus=" + st + "&taskType=" + _tasktype + "&tfuncid=" + fid + "&wtype=" + wtype + "&action=load";

  var taskid = url.substring(url.indexOf("?taskID=") + 8);
  taskid = taskid.substring(0, taskid.indexOf("&"));
  var taskt = url.substring(url.indexOf("&taskType=") + 10);
  taskt = taskt.substring(0, taskt.indexOf("&"));
  var size = Common.getStyleWidthHeight("", taskid, taskt, "");
  if (size) url += "&rs=0&mt=0"; //已经调整了，不在需要调整大小
  else size = "width=780,height=550,left=0,top=0,";


  //取出宽度和高度，然后调整为居中
  var wVal = size.substring(size.indexOf("width=") + 6, size.indexOf(",height="));
  var hVal = size.substring(size.indexOf("height=") + 7, size.indexOf(",left="));

  var leftVa = 0;
  var topVa = 0;
  leftVa = (window.screen.width - parseInt(wVal, 10)) / 2;
  topVa = (window.screen.height - parseInt(hVal, 10)) / 2;
  if (leftVa < 0) {
    leftVa = 0;
  }
  if (topVa < 0) {
    topVa = 0;
  }
  size = "width=" + wVal + ",height=" + hVal + ",left=" + leftVa + ",top=" + topVa + ",";

  //弹出窗体并告诉工作流不需要弹出窗口
  var currentUserId = window.userInfo.userid;
  window.open(url + "&openWin=F", taskid + currentUserId, size + "toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
}
