require('./news.scss');
var newsTmpl = require('./news.tmpl');
var url = 'datas/news.json';
$.getJSON(url, function(data) {
  var html = newsTmpl.render({data:data.business});
  $('#news-business .list-content').html(html);
   html = newsTmpl.render({data:data.company});
  $('#news-company .list-content').html(html);
   html = newsTmpl.render({data:data.big});
  $('#news-big .list-content').html(html);
});
