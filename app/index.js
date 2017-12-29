require("babel-polyfill");
require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert2/dist/sweetalert2.css');
require('./scss/app.scss');
require('./scss/index.scss');
require('jquery');
$.ajaxSetup({
  async: false
});
$.getJSON('business.do?action=getUserInfo', function (userInfo) {
  $('#welcome h4').html('欢迎您:' + userInfo.username + ' 角色:' + userInfo.rolename);
  window.userInfo = userInfo;
}).fail(function () {
  Common.reLogin();
});
$.ajaxSetup({
  async: true
});
require('./tab/tab.js');
require('./sidebar/sidebar.js');
require('./navbar/navbar.js');
window.pathObj = {
  pathArr: [],
  loadContent: function (url, param) {
    if (url === 'main.html') {
      this.pathArr = [];
    }
    this.pathArr.push({
      url: url,
      param: param
    });
    $("#content").load(url);
  },
  backForward: function () {
    if (this.pathArr.length < 2) {
      return;
    }
    this.pathArr.pop();
    var pathItem = this.pathArr.pop();
    this.loadContent(pathItem.url, pathItem.param);
  },
  getParam: function () {
    return this.pathArr[this.pathArr.length - 1].param;
  }
}
window.pathObj.loadContent('main.html');
