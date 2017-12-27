require('./message.scss');
var messageTmpl = require('./message.tmpl');
var selector = '#message .message-content .list-content';

function render(data) {
  var html = messageTmpl.render(data);
  $(this.selector).html(html);
}

module.exports = {
  selector: selector,
  render: render
};
