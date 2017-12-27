require('./scss/detail.scss');
require('./scss/pagination.scss');
var affixTmpl = require('./detail/affix.tmpl');
var param = window.pathObj.getParam();
var file_id = param.file_id;
var affix_fileid = param.affix_fileid;
var issue_username = param.issue_username;
if (issue_username) {
  issue_username = decodeURIComponent(issue_username);
}
var issue_date = param.issue_date;
$('#issue_user').html('（发布人 ：' + issue_username + '&nbsp;&nbsp;' + issue_date + '）');
var fileUrl = Common.rootpath + '/common/updownfile/jsp/updownfile.do?action=ConvertDocToHtmlandDownFile&downWay=1&forceHtml=1&fileId=' + file_id;
$('#detail').attr('src', fileUrl);

$('#detail').on('load', function () {
  $(this).height($('#content').height() - $('#issue_user').height() - $('#affix').height() - 30);
});

if (affix_fileid) {
  $.getJSON('business.do?action=getFileName&affix_fileid=' + affix_fileid).then(function (data) {
    var html = affixTmpl.render({
      files: data
    });
    $('#affix ol ').html(html);
    $('#affix a').click(function () {
      var _fileid = $(this).attr('fileid');
      var url = Common.rootpath + '/common/updownfile/jsp/updownfile.do?action=DownFile&fileId=' + _fileid + '&downWay=2&thumbnail=';
      window.open(url, "_blank", "toolbar=no,menubar=no,scrollbars=no,center=yes,alwaysLowered=yes,resizable=no,location=no,status=no,width=100,height=100");
      return false;
    });
    setDetailHeight();
  });
} else {
  $('#affix').hide();
}
$('#back-forward').click(function () {
  window.pathObj.backForward()
});
