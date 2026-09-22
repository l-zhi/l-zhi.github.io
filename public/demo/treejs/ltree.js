
/*//////////////////////////////////////////////////////////
//  ltree.js
//  version:1.0
//  author: lizhi
//  2013-9-7 23:03
//                                 .ze$$e.
//              .ed$$$eee..      .$$$$$$$P""
//           z$$$$$$$$$$$$$$$$$ee$$$$$$"
//        .d$$$$$$$$$$$$$$$$$$$$$$$$$"
//      .$$$$$$$$$$$$$$ l-zhi.com $$$$$e..
//    .$$****""""***$$$$$$$$$$$$$$$$$$$$$$$$$$$be.
//                     ""**$$$$$$$$$$$$$$$$$$$$$$$L
//                       z$$$$$$$$$$$$$$$$$$$$$$$$$
//                     .$$$$$$$$P**$$$$$$$$$$$$$$$$
//                    d$$$$$$$"              4$$$$$
//                  z$$$$$$$$$                $$$P"
//                 d$$$$$$$$$F                $P"
//                 $$$$$$$$$$F 
//                  *$$$$$$$$"
//                    "***""
////////////////////////////////////////////////////////////
*/


(function() {
  var Tree, addEvent, getDataset, setDataset;

  Tree = (function() {
    var cids, proxy, _getNodes;

    function Tree(id, data, filename) {
      var el;
      if (typeof id === 'string') {
        el = document.getElementById(id);
      }
      filename = filename || this._defualtOption['filename'];
      if (!el || typeof data !== 'object' || data.length < 1) {
        throw '参数错误';
      } else {
        this.__init__(el, data, filename);
      }
    }

    cids = '';

    _getNodes = function(data, filename) {
      var d, f, list, _i, _len;
      f = filename || this.filename;
      list = {};
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        if (!list[d[f[1]]]) {
          list[d[f[1]]] = [d];
        } else {
          list[d[f[1]]].push(d);
        }
        if (data[f[2]] === '1') {
          cids += data[f[1]] + ',';
        }
      }
      cids = cids.substring(0, cids.length - 1);
      return list;
    };

    Tree.prototype._defualtOption = {
      'filename': ['id', 'pid', 'isleaf', 'name']
    };

    proxy = function(callback, scope) {
      var self;
      self = scope;
      return (function() {
        return callback.apply(self, arguments);
      });
    };

    Tree.prototype.__init__ = function(el, data, filename) {
      this.el = el;
      this.data = data;
      this.filename = filename;
      this.list = _getNodes(data, filename);
      this.show(this.el, this.list[0]);
      this._bindEvent();
      return this;
    };

    Tree.prototype._bindEvent = function() {
      addEvent(this.el, 'click', proxy(function(e) {
        var cn, dataset, id, target, ul;
        target = e.target || event.srcElement;
        if (target.parentNode.tagName === 'DIV') {
          target = target.parentNode;
        }
        if (target.tagName === 'DIV' || target.parentNode.tagName === 'DIV') {
          id = getDataset(target, 'id');
          dataset = this.list[id];
          cn = target.className;
        }
        if ('0' !== getDataset(target, 'isleaf')) {
          return false;
        }
        if (!getDataset(target, 'status')) {
          this.show(target.parentNode, dataset);
          setDataset(target, 'status', 'on');
          target.className = 'l_node active';
          return;
        }
        ul = target.nextSibling;
        if (cn.indexOf('active') > -1 && getDataset(target, 'status') === 'on') {
          target.className = 'l_node';
          setDataset(target, 'status', 'off');
          return ul.className = '';
        } else {
          target.className = 'l_node active';
          setDataset(target, 'status', 'on');
          return ul.className = 'active';
        }
      }, this));
      return this;
    };

    Tree.prototype.show = function(target, dataset) {
      var clist, d, f, s, ul;
      if (!target.tagName || 'object' !== typeof dataset) {
        return false;
      }
      ul = document.createElement('ul');
      f = this.filename;
      ul.className = 'active';
      clist = dataset;
      s = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = clist.length; _i < _len; _i++) {
          d = clist[_i];
          _results.push('<li><div class="l_node" data-isleaf=" + d[f[2]] + " data-id=" + d[f[0]] + "><span class="node_icon"><em class="arrow"></em>&nbsp;--</span><a class="node_name" href="javascript:;" target="_blank" rel="external">' + d[f[3]] + '</a></div></li>');
        }
        return _results;
      })();
      ul.innerHTML = s.join('');
      target.appendChild(ul);
      return this;
    };

    Tree.prototype.getCids = function() {
      return cids;
    };

    Tree.prototype.setCids = function(str) {
      return cids = str;
    };

    Tree.prototype.getLeafId = function(id, isleaf) {
      if (id < 0 || !this.list) {
        return false;
      }
      if (!isleaf) {
        cids = '';
        this._getCid(id);
      } else {
        cids = id + ',';
      }
      cids = cids.substring(0, cids.length - 1);
      return cids;
    };

    Tree.prototype._getCid = function(id) {
      var d, f, list, _i, _len;
      if (id < 0) {
        return false;
      }
      if (!(list = this.list[id])) {
        return false;
      }
      f = this.filename;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        d = list[_i];
        if (d[f[2]] === 1) {
          cids += d[f[0]] + ',';
        } else {
          arguments.callee.call(this, d[f[0]]);
        }
      }
      return cids;
    };

    return Tree;

  })();

  setDataset = function(element, key, val) {
    if (element.dataset) {
      element.dataset[key] = val;
    } else {
      element.setAttribute('data-' + key, val);
    }
    return val;
  };

  addEvent = function(element, event, handler) {
    if (window.addEventListener) {
      return element.addEventListener(event, handler, false);
    } else if (window.attachEvent) {
      return element.attachEvent('on' + event, handler);
    } else {
      return element['on' + event] = handler;
    }
  };

  getDataset = function(element, name) {
    var val;
    val = (element.dataset && element.dataset[name]) || element.getAttribute('data-' + name);
    return val;
  };

  this.Tree = Tree;

  this.addEvent = addEvent;

  this.getDataset = getDataset;

  this.setDataset = setDataset;

}).call(this);
