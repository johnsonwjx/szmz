require('./news.scss');
var newsTmpl = require('./news.tmpl');
var url = 'datas/news.json';
var $contents = $('#news .news .list-content');
$('#news-business .more').click(function() {
  window.open('list.html?type=news-business');
  return false;
});
$('#news-company .more').click(function() {
  window.open('list.html?type=news-company');
  return false;
});
$('#news-big .more').click(function() {
  window.open('list.html?type=news-big');
  return false;
});

Common.getJSON(url, $contents).then(function(data) {
  var html = newsTmpl.render({
    data: data.business
  });
  $('#news-business .list-content').html(html);
  html = newsTmpl.render({
    data: data.company
  });
  $('#news-company .list-content').html(html);
  html = newsTmpl.render({
    data: data.big
  });
  $('#news-big .list-content').html(html);
});
