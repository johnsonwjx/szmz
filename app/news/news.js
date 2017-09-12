require('./news.scss');
var newsTmpl = require('./news.tmpl');
var selector = '#news .news .list-content';
$('#news-business .more').click(function() {
  window.open('list.html?type=business');
  return false;
});
$('#news-company .more').click(function() {
  window.open('list.html?type=company');
  return false;
});
$('#news-big .more').click(function() {
  window.open('list.html?type=big');
  return false;
});

function render(data) {
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
}
module.exports = {
  selector: selector,
  render: render
};
