require("babel-polyfill");
require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert2/dist/sweetalert2.css');
require('./scss/app.scss');
require('./scss/index.scss');
var $ = require('jquery');
var _ = require('lodash');
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
    var pathArr = this.pathArr;
    if (url === 'main.html') {
      pathArr = [];
    } else {
      pathArr.push({
        url: url,
        param: param
      });
    }
    this.pathArr = pathArr;
    $("#content").load(url, function () {
      $('.oper').hide();
      if (pathArr.length > 0) {
        $('#back-forward').show();
      }
    });
  },
  backForward: function () {
    if (this.pathArr.length <= 1) {
      this.loadContent('main.html');
    } else {
      this.pathArr.pop();
      var pathItem = this.pathArr.pop();
      this.loadContent(pathItem.url, pathItem.param);
    }
  },
  getParam: function () {
    return this.pathArr[this.pathArr.length - 1].param;
  }
}
$(function () {
  $('#to-top').click(function () {
    $('#content').animate({
      scrollTop: 0
    }, 1000);
  });
  $('#content').scroll(_.debounce(function () {
    if (this.scrollTop > 50) {
      $('#to-top').fadeIn(250);
    } else {
      $('#to-top').fadeOut(250);
    }
  }, 250));
  $('#back-forward').click(function () {
    window.pathObj.backForward()
  });
  window.pathObj.loadContent('main.html');
});
