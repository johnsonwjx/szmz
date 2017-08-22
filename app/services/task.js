//取出打开样式的长宽高
function getStyleWidthHeight(flowcode, taskid, taskType, wpid, customid) {
  customid = customid || "";
  var reStr = "";
  var url = Common.rootpath + "flow.do?action=getStyleInfo&flowcode=" + flowcode + "&taskid=" + taskid + "&taskType=" + taskType + "&workpubid=" + wpid + "&customid=" + customid;
  $.ajax({
    async: false, //使用同步的Ajax请求
    url: url,
    success: function(msg) {
      reStr = msg;
    }
  });
  return reStr;
}

function getTasks(taskType, callback, message) {
  var url = Common.rootpath + 'loadMain.do?action=loadTaskByAjax&taskType=' + taskType + '&taskGpType=D&filter=';
  if (message) {
    //通知
    url += "&getnoftify=1&allnotify=0";
  }
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
  }).fail(function(response) {
    if (!Common.errorHandle(response)) {
      return;
    }
  });
}

function openTask(id, st, fid, wtype, taskType) {
  var url = Common.rootpath + "flow.do?taskID=" + id + "&taskStatus=" + st + "&taskType=" + taskType + "&tfuncid=" + fid + "&wtype=" + wtype + "&action=load";
  var taskid = url.substring(url.indexOf("?taskID=") + 8);
  taskid = taskid.substring(0, taskid.indexOf("&"));
  var taskt = url.substring(url.indexOf("&taskType=") + 10);
  taskt = taskt.substring(0, taskt.indexOf("&"));
  var size = getStyleWidthHeight("", taskid, taskt, "");
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
module.exports = {
  getTasks: getTasks,
  openTask: openTask
};
