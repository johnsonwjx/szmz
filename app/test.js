require('sweetalert2/dist/sweetalert2.css');
require('./contact/contact.scss');
var $ = require('jquery');
var infoTmpl = require('./contact/info.tmpl');
var data = {
  "name": "罗永钦",
  "dept_code": "1010503",
  "dept_name": "招投标部",
  "role_code": "13",
  "role_name": "实习生",
  "personid": "35e3476d4dbd4c0aacb654bcc9550f7c",
  "mobiletelephonenumber": "",
  "corpname": "深圳市美芝装饰设计工程股份有限公司",
  "qq": "",
  "sex": "男",
  "email": "",
  "corpcode": "101",
  "telephonenumber": "",
  "gender": "male"
};
var html = infoTmpl.render(data);
swal({
  title: '<i class="fa fa-user" aria-hidden="true"></i>人员信息',
  html: $(html),
  showCloseButton: true
});
