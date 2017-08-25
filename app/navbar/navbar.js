require('./navbar.scss');
$('#password-change').click(function() {
  window.passwordUtility.openSetPwdDialog();
  return false;
});

$('#help').click(function() {
  swal('开发中...');
  return false;
});

$('#close-system').click(Common.reLogin);
