require('purecss');
require('font-awesome/scss/font-awesome.scss');
require('sweetalert/dist/sweetalert.css');
require('./scss/app.scss');
require('./scss/index.scss');
require('jquery');
require('./tab/tab.js');
require('./sidebar/sidebar.js');
require('./navbar/navbar.js');
var News = require('./news/news.js');
var Message = require('./message/message.js');
require('./finance/finance.js');
require('./contact/contact.js');
require('./schedule/schedule.js');
require('./task/task.js');
require('./weather/weather.js');
require('./common/common.js');
require('./notify/notify.js');
var NewsUtil = require('./services/news.js');
var $content = $([News.selector, Message.selector].join(','));
Common.getJSON('business.do?action=loadAllNews', $content).then(function(data) {
  var news = _.chain(data).values().flatten().value();
  News.render(data);
  Message.render(data);
  $content.find('.list-item').click(function() {
    var id = $(this).attr('newsid');
    var newsItem = _.find(news, function(item) {
      return item.id == id;
    });
    NewsUtil.openDetail(newsItem);
    return false;
  });
});
