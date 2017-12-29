require('./sidebar.scss');
$('#sidebar iframe').on('load', function () {
  $(this).contents().find('#tree').css({
    position: 'absolute',
    top: 0,
    bottom: '50px',
    height: ''
  });
});
$('#sidebar iframe').attr('src', Common.rootpath + 'desktop2.1/jsp/mywork.jsp');
