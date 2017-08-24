var rootpath = window.location.href.substr(0, window.location.href.indexOf('portal'));
window.getRootPath = function() {
  return rootpath;
};

function errorHandle(response) {
  if (response.responseText === '未登录' || response.responseText.indexOf('<html>') !== -1) {
    reLogin();
  }
}

function reLogin() {
  window.location.href = rootpath + 'login.do?action=relogin';
  return false;
}

var status = {
  loadding: '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">加载中...</span>',
  error: '<i class="fa fa-exclamation-circle fa-3x" aria-hidden="true"></i>错误'
};

function param(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
module.exports = {
  rootpath: rootpath,
  errorHandle: errorHandle,
  reLogin: reLogin,
  status: status,
  param: param
};
