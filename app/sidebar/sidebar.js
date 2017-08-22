require('./sidebar.scss')
var Tree = require('../tree/tree.js');
var treeTmpl = require('./tree.tmpl');
var childrenTmpl = require('./children.tmpl');
// var url = 'datas/func.json';
var url = Common.rootpath + 'loadFunc.do?action=getFuncJsonBynewDesktop2';
var icons = ['fa-user', 'fa-briefcase', 'fa-dot-circle-o', 'fa-bank', 'fa-money'];
$.getJSON(url, function(funcs) {
  var nodes = [],
    codeObjMap = {};
  $.each(funcs, function(index, item) {
    var parentNode = item.parentcode ? codeObjMap[item.parentcode] : null;
    item.children = [];
    if (parentNode) {
      parentNode.children.push(item);
    } else {
      nodes.push(item);
    }
    codeObjMap[item.code] = item;
  });
  codeObjMap = null;
  var html = treeTmpl.render({
    nodes: nodes
  }, {
    children: childrenTmpl
  });
  $('#sidebar .tree').html(html)
  $('#sidebar .tree .pure-menu-link').click(function() {
    Tree.nodeClick.call(this);
    debugger;
    var $node = $(this);
    var url = $node.attr('url');
    if (url) {
      openFlowUrl(Common.rootpath + url, 1);
    }
  });
  $('#sidebar .tree .level1 .icon').each(function(index, item) {
    $(item).addClass(icons[index])
  });
})

/**
 * 新窗口打开或者直接打开
 * @param url 路径后面的参数
 * @param openMode 打开方式，0 或1,表示页面打开模式是非打开新页面和打开新页面
 */
function openFlowUrl(url, openMode) {

  openMode = "1";

  //新窗口打开
  if (openMode == "1") {

    //计算窗口的打开位置为居中
    var left = (1024 - 780) / 2;
    var top = (768 - 550) / 2;
    try {
      left = (window.screen.width - 780) / 2;
      top = (window.screen.height - 550) / 2;
    } catch (e) {}
    //检查业务功能是不是工作流业务，如果是直接跳转
    //将&amp;换成&
    url = url.replace(/&amp;/gi, "&");
    var funcType = url.substring(url.indexOf("&funcType=") + 10);
    funcType = funcType.substring(0, funcType.indexOf("&"));

    var funcIdStr = url.substring(url.indexOf("&funcId=") + 8);
    funcIdStr = funcIdStr.substring(0, funcIdStr.indexOf("&"));

    var size = "width=780,height=550,left=" + left + ",top=" + top + ",";
    if ("1" == funcType) {
      var code = url.substring(url.indexOf("&flowClassID=") + 13);
      code = code.substring(0, code.indexOf("&"));
      size = Common.getStyleWidthHeight(code, "", "", "");
      if (size != null) url += "&rs=0&mt=0"; //已经调整了，不在需要调整大小
      else size = "width=780,height=550,left=0,top=0,";

      //取出宽度和高度，然后调整为居中
      var wVal = size.substring(size.indexOf("width=") + 6, size.indexOf(",height="));
      var hVal = size.substring(size.indexOf("height=") + 7, size.indexOf(",left="));

      var leftVa = 0;
      var topVa = 0;
      try {
        leftVa = (window.screen.width - parseInt(wVal, 10)) / 2;
        topVa = (window.screen.height - parseInt(hVal, 10)) / 2;

        if (leftVa < 0) {
          leftVa = 0
        }

        if (topVa < 0) {
          topVa = 0
        }
      } catch (e) {}
      size = "width=" + wVal + ",height=" + hVal + ",left=" + leftVa + ",top=" + topVa + ",";
    } else if ("2" == funcType) {
      var fid = url.substring(url.indexOf("&flowClassID=") + 13);
      fid = fid.substring(0, fid.indexOf("&"));
      if (fid == "00004501") {
        var wpid = url.substring(url.indexOf("moduleid%3D") + 11, url.indexOf("moduleid%3D") + 11 + 32);
        size = Common.getStyleWidthHeight("", "", "", wpid);
        if (size != null) url += "&rs=0&mt=0"; //已经调整了，不在需要调整大小
        else size = "width=780,height=550,left=0,top=0,";

        //取出宽度和高度，然后调整为居中
        var wVal = size.substring(size.indexOf("width=") + 6, size.indexOf(",height="));
        var hVal = size.substring(size.indexOf("height=") + 7, size.indexOf(",left="));

        var leftVa = 0;
        var topVa = 0;
        try {
          leftVa = (window.screen.width - parseInt(wVal, 10)) / 2;
          topVa = (window.screen.height - parseInt(hVal, 10)) / 2;

          if (leftVa < 0) {
            leftVa = 0
          }

          if (topVa < 0) {
            topVa = 0
          }
        } catch (e) {}
        size = "width=" + wVal + ",height=" + hVal + ",left=" + leftVa + ",top=" + topVa + ",";
      } else if (fid == "40029002") { //自定义查询2.0
        var wpid = url.substring(url.indexOf("resultStyleID%3D") + 16, url.indexOf("resultStyleID%3D") + 16 + 32);
        size = Common.getStyleWidthHeight("", "", "", "", wpid);
        if (size != null) url += "&rs=0&mt=0"; //已经调整了，不在需要调整大小
        else size = "width=780,height=550,left=0,top=0,";

        //取出宽度和高度，然后调整为居中
        var wVal = size.substring(size.indexOf("width=") + 6, size.indexOf(",height="));
        var hVal = size.substring(size.indexOf("height=") + 7, size.indexOf(",left="));

        var swd = screen.availWidth;
        var sht = screen.availHeight;
        if (swd > 1280) {
          wVal = swd * 0.9;
          hVal = sht * 0.8;
        }

        var leftVa = 0;
        var topVa = 0;
        try {
          leftVa = (window.screen.width - parseInt(wVal, 10)) / 2;
          topVa = (window.screen.height - parseInt(hVal, 10)) / 2;

          if (leftVa < 0) {
            leftVa = 0
          }

          if (topVa < 0) {
            topVa = 0
          }
        } catch (e) {}
        size = "width=" + wVal + ",height=" + hVal + ",left=" + leftVa + ",top=" + topVa + ",";
      }
    }
    var currentUserId = ""; //window.parent.frameElement.contentWindow.parent.getCurrentUserId();
    var wino = window.open(url + "&openWin=T", funcIdStr + currentUserId, size + "toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
    wino.focus();
    wino.focus();
    try {
      window.parent.frameElement.contentWindow.parent.setOpenWinObj(wino);
    } catch (ee) {}
  }
  //直接打开
  else {
    //window.parent.document.getElementById("main").contentWindow.location.href = url;
    var title = treeNodeObj.text;
    //var workObj = window.parent.document.getElementById("work").contentWindow;
    var workObj = window.parent.document.getElementById("rightMainFrame").contentWindow;
    workObj.location.href = "loadFunc.do?action=workpanel&param=" + encodeURIComponent(url);
  }
}
