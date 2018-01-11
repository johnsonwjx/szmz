require("babel-polyfill");
require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert2/dist/sweetalert2.css');
require('./scss/index.scss');
var $ = require('jquery');
var _ = require('lodash');
$.ajaxSetup({
  async: false
});
$.getJSON('business.do?action=getUserInfo&' + new Date().getTime(), function (userInfo) {
  window.userInfo = userInfo;
  $('#welcome h4').html('欢迎您:' + window.userInfo.username + ' 角色:' + window.userInfo.rolename);
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
  preParam: null,
  curParam: null,
  loadContent: function (param, hashNotChange) {
    param = param || {
      url: 'main.html'
    };
    if (typeof param === 'string') {
      try {
        param = JSON.parse('{"' + decodeURI(decodeURI(location.hash.substring(1))).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      } catch (e) {
        param = {
          url: 'main.html'
        };
      }
    }
    if (param.url === 'main.html') {
      window.pathObj.preParam = null;
    } else {
      window.pathObj.preParam = window.pathObj.curParam;
    }
    this.curParam = param;
    $("#content").load(param.url, function () {
      $('.oper').hide();
      if (param.url === 'list.html' || param.url === 'detail.html') {
        $('#back-forward').show();
      }
      if (!hashNotChange) {
        window.haschangeSuspend = true;
        location.hash = $.param(param)
      }
    });
  },
  backForward: function () {
    if (this.preParam && this.preParam.url !== 'detail.html') {
      this.loadContent(this.preParam);
    } else {
      this.loadContent({
        url: 'main.html'
      });
    }
  },
  getParam: function () {
    return this.curParam;
  }
}

window.onhashchange = function (event) {
  if (window.haschangeSuspend) {
    window.haschangeSuspend = false;
    return;
  }
  window.pathObj.loadContent(location.hash, true);
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
  window.pathObj.loadContent(location.hash);
});
