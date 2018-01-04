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


$('#content').scroll(_.debounce(function () {
  if (this.scrollTop > 100) {
    $('#to-top').fadeIn(250);
  } else {
    $('#to-top').fadeOut(250);
  }
}, 250));

$('#to-top').click(function () {
  $('#content').animate({
    scrollTop: 0
  }, 1000);
});


$('#detail').on('load', function () {
  var height = 0;
  var $children = $(this.contentWindow.document.body).children();
  var imgMode = true;
  $children.each(function (index, item) {
    if (item.nodeName !== "IMG") {
      imgMode = false;
      return false;
    }
  });
  if (imgMode) {
    height = 1414 * $children.length;
  } else if ($children.get(0).nodeName === "OBJECT") {
    height = 820;
  } else {
    height = this.contentWindow.document.body.offsetHeight + 100;
  }
  this.style.height = height + 'px';
});

var fileUrl = Common.rootpath + '/common/updownfile/jsp/updownfile.do?action=ConvertDocToHtmlandDownFile&downWay=1&forceHtml=1&fileId=' + file_id;
$('#detail').attr('src', fileUrl);


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
