function openDetail(newsItem) {
  if (!newsItem.file_id) {
    return;
  }
  var param = _.pick(newsItem, ['file_id', 'affix_fileid', 'issue_username', 'issue_date']);
  param.issue_username = encodeURIComponent(param.issue_username);
  param.url = 'detail.html'
  window.pathObj.loadContent(param);
}
module.exports = {
  openDetail: openDetail
};
