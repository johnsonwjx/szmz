var rootpath = window.location.href.substr(0, window.location.href.indexOf('portal'));

function errorHandle(response) {
  if (response.responseText === '未登录' || response.responseText.indexOf('<html>') !== -1) {
    reLogin();
    return false;
  }
  return true;
}

function reLogin() {
  window.location.href = rootpath + 'login.do?action=relogin';
}

module.exports = {
  rootpath: rootpath,
  errorHandle: errorHandle,
  reLogin: reLogin
};
