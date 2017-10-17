require('./contact.scss');
var Tree = require('../tree/tree.js');
var treeTmpl = require('./tree.tmpl');
var childrenTmpl = require('./children.tmpl');
var infoTmpl = require('./info.tmpl');
var Search = require('../search/search');
var url = 'business.do?action=loadContacts',
  // var url = 'datas/contact.json',
  $content = $('#contact .tree'),
  persons;

function showInfo(data) {
  var html = infoTmpl.render(data);
  swal({
    title: '<i class="fa fa-user" aria-hidden="true"></i>&nbsp;人员信息',
    html: $(html),
    showCloseButton: true
  });
}
var search = Search({
  $input: '#contract-search',
  callback: function(data) {
    var $select = $content.find('[personid="' + data.personid + '"]');
    $content.find('.expand').children('.pure-menu-link').click();
    $select.parents('.pure-menu-item').children('.pure-menu-link').click();
    $content.find('.select').removeClass('select');
    $select.addClass('select');
    $content.scrollTop($select.parents('.level1').position().top);
    showInfo(data);
  }
});
var flatData = function(data) {
  if (data.children) {
    return flatData(data.children);
  }
  if (data.personid) {
    return data;
  }
};
Common.getJSON(url, $content).then(function(result) {
  var html = treeTmpl.render(result, {
    children: childrenTmpl
  });
  $content.html(html);
  $content.find('.pure-menu-link').click(Tree.nodeClick);
  persons = result.persons;
  search.setDatas(persons);
  $content.find('.person a').click(function() {
    var personid = $(this).attr('personid');
    if (personid) {
      var person = _.find(persons, function(item) {
        return item.personid === personid;
      });
      if (person) {
        showInfo(person);
        $content.find('.select').removeClass('select');
        $(this).addClass('select');
      }
    }
    return false;
  });
});
