require('./news.scss');
var newsTmpl = require('./news.tmpl');
var selector = '#news .news .list-content';

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
