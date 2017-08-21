require('./message.scss');
var messageTmpl = require('./message.tmpl');
var $ = require('jquery');
var url = 'datas/message.json';
$.getJSON(url, function(data) {
  var html = messageTmpl.render({
    data: data
  });
  $('#message .message-content .list-content').html(html);
});
