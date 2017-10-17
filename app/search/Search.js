require('./search.scss');
var _ = require('lodash');
var searchTmpl = require('./search.tmpl');
var tmpl = '<ul class="searchList"></ul>';
var lineHeight = 21;
var defaults = {
  $input: null,
  datas: [],
  field: 'name',
  style: {},
  result: [],
  resultSize: 6,
  callback: null,
  timeout: 100,
  preText: null,
  timer: null,
  inSearchListFlag: false,
  actionFlag: false //延时执行中，查找操作不能执行
};

function Search(props) {
  _.defaults(this, props, defaults);
  if (typeof this.$input === 'string') {
    this.$input = $(this.$input);
  }
  var
    style = _.defaults(this.style, {
      left: this.$input.offset().left,
      top: this.$input.offset().top + this.$input.outerHeight(),
      width: this.$input.width(),

    }),

    me = this;
  this.$searchList = $(tmpl).css(style).appendTo('body');
  this.$searchList.mouseenter(function() {
    me.inSearchListFlag = true;
  });
  this.$searchList.mouseleave(function() {
    me.inSearchListFlag = false;
    me.$input.focus();
  });
  this.$input.click(function() {
    me.search();
  });
  this.$input.blur(function() {
    if (me.inSearchListFlag) {
      return;
    }
    me.$searchList.hide();
  });
  this.$input.keydown(function(event) {
    me.inputKeydown(event);
  });
  this.$input.bind("input", function(event) {
    me.inputKeyup(event);
  });
}
Search.prototype.setDatas = function(datas) {
  this.datas = datas;
};
Search.prototype.inputKeydown = function(event) {
  //查询结果显示时候 去掉input的上下方向键事件,
  if (this.$searchList.is(':visible')) {
    if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
    }
    var $select = this.$searchList.find('.select');
    if (!$select.length) {
      return;
    }
    switch (event.keyCode) {
      case 38:
        if ($select.index() === 0) {
          this.$input.focus();
          return;
        }
        $select = $select.removeClass('select').prev().addClass('select');
        break;
      case 40:
        if ($select.is(':last-child')) {
          return;
        }
        $select = $select.removeClass('select').next().addClass('select');
        this.$searchList.scrollTop($select.position().top);
        break;
      case 13:
        $select.children('a').click();
        break;
    }
    $select.focus();
  }
};
Search.prototype.inputKeyup = function(event) {
  if (this.actionFlag) {
    return;
  }
  if (this.$searchList.is(':visible')) {
    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13) {
      return;
    }
  } else {
    if (event.keyCode === 13) {
      return;
    }
  }
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  var me = this;
  var timer = setTimeout(function() {
    me.search();
  }, this.timeout);
  this.timer = timer;
};
Search.prototype.search = function() {
  if (this.actionFlag) {
    return;
  }
  this.calledFlag = false;
  this.actionFlag = true;

  try {
    var text = this.$input.val().trim();
    this.timer = null;
    if (!text) {
      this.$searchList.hide();
      this.text = text;
      return;
    }
    if (text == this.text) {
      if (this.result.length > 0) {
        this.$searchList.show();
      }
      return;
    }
    this.text = text;
    var field = this.field;
    this.result = _.filter(this.datas, function(item) {
      return item[field].indexOf(text) !== -1;
    });
    if (!this.result.length) {
      this.$searchList.hide();
      return;
    }
    if (this.result.length > this.resultSize) {
      this.result = _.slice(this.result, 0, this.resultSize);
    }
    _.forEach(this.result, function(item) {
      item.text = item[field].replace(new RegExp(text, 'g'), '<span class="hit">' + text + '</span>');
    });
    var html = searchTmpl.render({
      datas: this.result
    });
    this.$searchList.html(html).find('li').eq(0).addClass('select');
    this.$searchList.css({
      height: this.result.length * lineHeight + 10
    }).show();
    var me = this;
    var callbackFun = function(event) {
      me.$searchList.find('.select').removeClass('select');
      var $select = $(event.target).parent('li').addClass('select');
      if (me.callback) {
        var data = me.result[$select.index()];
        me.callback(data, event);
      }
      me.$searchList.hide();
      return false;
    };
    this.$searchList.find('a').click(callbackFun);
  } finally {
    this.actionFlag = false;
  }

};

module.exports = function(props) {
  return new Search(props || {});
};
