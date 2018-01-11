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

function setFrameHeight() {
  var $frame = $('#detail');
  if ($frame.length < 1) {
    $(this).off('resize');
    return;
  }
  var height = 0;
  var $children = $($frame.get(0).contentWindow.document.body).children();
  var imgMode = true;
  $children.each(function (index, item) {
    if (item.nodeName !== "IMG") {
      imgMode = false;
      return false;
    }
  });
  if (imgMode) {
    height = 1414 * $children.length + 50;
  } else if ($children.get(0).nodeName === "OBJECT") {
    height = 820;
  } else {
    height = $frame.get(0).contentWindow.document.body.offsetHeight + 100;
  }
  $frame.css('height', height)
}


$('#detail').on('load', function () {
  $(this.contentDocument.body).find('p[align="center"]').css('text-align', 'center');
  setFrameHeight();
  $(window).on('resize', _.debounce(setFrameHeight, 250));
});

var fileUrl = Common.rootpath + '/common/updownfile/jsp/updownfile.do?action=ConvertDocToHtmlandDownFile&downWay=1&forceHtml=1&fileId=' + file_id;
$('#detail').attr('src', fileUrl);

if (affix_fileid) {
  $.getJSON('business.do?action=getFileName&affix_fileid=' + affix_fileid + '&' + new Date().getTime()).then(function (data) {
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
