require('./message.scss');
var messageTmpl = require('./message.tmpl');
var selector = '#message .message-content .list-content';
$('#message .message-content .more').click(function() {
  window.open('list.html?type=message');
  return false;
});

function render(data) {
  var html = messageTmpl.render(data);
  $(this.selector).html(html);
}

module.exports = {
  selector: selector,
  render: render
};
