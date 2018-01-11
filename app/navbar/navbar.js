require('./navbar.scss');
$('#home').click(function () {
  window.pathObj.loadContent({
    url: 'main.html'
  });
});
$('#password-change').click(function () {
  window.passwordUtility.openSetPwdDialog({
    cancelable: true
  });
  return false;
});

$('#help').click(function () {
  swal('开发中...');
  return false;
});

$('#close-system').click(Common.reLogin);
