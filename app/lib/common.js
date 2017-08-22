var rootpath = window.location.href.substr(0, window.location.href.indexOf('portal'));
//取出打开样式的长宽高
function getStyleWidthHeight(flowcode, taskid, taskType, wpid, customid) {
  if (customid == undefined)
    customid = "";
  var reStr = null;
  var url = "../../flow.do";

  $.ajax({
    async: false, //使用同步的Ajax请求
    type: "POST",
    url: url,
    data: "action=getStyleInfo&flowcode=" + flowcode + "&taskid=" + taskid + "&taskType=" + taskType + "&workpubid=" + wpid + "&customid=" + customid,
    success: function(msg) {
      reStr = msg;
    }
  });

  return reStr;
}

module.exports = {
  rootpath: rootpath,
  getStyleWidthHeight: getStyleWidthHeight
};
