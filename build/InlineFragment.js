(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WaitForChildren, intersperse, isFunction;

WaitForChildren = require('WaitForChildren');

isFunction = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

intersperse = function(withElm, list) {
  var i, j, l, ref;
  l = list.length;
  for (i = j = 0, ref = l - 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    if (isFunction(withElm)) {
      list.splice(i * 2 + 1, 0, withElm());
    } else {
      list.splice(i * 2 + 1, 0, withElm);
    }
  }
  return list;
};

Polymer({
  is: 'inline-fragment',
  properties: {
    lines: {
      type: Array,
      value: function() {
        return [];
      }
    },
    lineHeight: {
      type: Number,
      value: 20,
      observe: '_updateLineHeight'
    }
  },
  created: function() {
    return WaitForChildren(this);
  },
  ready: function() {
    Object.defineProperty(this, '_lineElements', {
      get: function() {
        return Polymer.dom(this).querySelectorAll('.line');
      }
    });
    Object.defineProperty(this, '_pieceElements', {
      get: function() {
        return this._lineElements.reduce((function(pieces, ln) {
          var pieceArray, pieceNodeList;
          pieceNodeList = ln.querySelectorAll('inline-piece');
          pieceArray = Array.prototype.slice.call(pieceNodeList);
          return pieces.concat(pieceArray);
        }), []);
      }
    });
    return this.childrenReady((function(_this) {
      return function() {
        return _this.fireReady();
      };
    })(this));
  },
  populateWithText: function(text) {
    return this.lines = this._textToLines(text);
  },
  getWidth: function() {
    if (this._lineElements.length === 0) {
      return 0;
    } else {
      return this._lineElements.map(this._getLineWidthFromElement).sort(function(a, b) {
        return b - a;
      })[0];
    }
  },
  getHeight: function() {
    if (this._lineElements.length === 0) {
      return 0;
    } else {
      return this._lineElements.map(this._getLineHeightFromElement).reduce((function(a, b) {
        return a + b;
      }), 0);
    }
  },
  getLineWidth: function(lineIndex) {
    var ln;
    ln = this._lineElements[lineIndex];
    if (ln != null) {
      return this._getLineWidthFromElement(ln);
    } else {
      return null;
    }
  },
  getLineHeight: function(lineIndex) {
    var ln;
    ln = this._lineElements[lineIndex];
    if (ln != null) {
      return this._getLineHeightFromElement(ln);
    } else {
      return null;
    }
  },
  getInsertionPoint: function() {
    var last;
    if (this._lineElements.length === 0) {
      console.warn('Fragment has no lines', this);
      return {
        top: 0,
        left: 0
      };
    } else {
      last = this._lineElements.length - 1;
      return {
        top: this.getHeight() - (this.getLineHeight(last)),
        left: this.getLineWidth(last)
      };
    }
  },
  _getLineWidthFromElement: function(ln) {
    var pieceArray, pieceNodeList;
    pieceNodeList = ln.querySelectorAll('inline-piece');
    pieceArray = Array.prototype.slice.call(pieceNodeList);
    return pieceArray.reduce((function(lineWidth, piece) {
      return lineWidth += piece.getWidth();
    }), 0);
  },
  _getLineHeightFromElement: function(ln) {
    var pieceArray, pieceNodeList;
    pieceNodeList = ln.querySelectorAll('inline-piece');
    pieceArray = Array.prototype.slice.call(pieceNodeList);
    return pieceArray.reduce((function(lineHeight, piece) {
      return Math.max(lineHeight, piece.getHeight());
    }), 0);
  }
});


},{"WaitForChildren":2}],2:[function(require,module,exports){

/*
Mixin to have an element call a callback once all distributed children have
  signalled ready.
 */
var WaitForChildren;

WaitForChildren = function(obj, eventName) {
  if (eventName == null) {
    eventName = 'child-ready';
  }
  Object.defineProperty(obj, 'childrenReady', {
    value: function(callback) {
      var onChildrenReady, receivedCount;
      receivedCount = 0;
      onChildrenReady = (function(_this) {
        return function(evt) {
          evt.stopPropagation();
          receivedCount++;
          if (receivedCount === _this.getContentChildren().length) {
            _this.removeEventListener(eventName, onChildrenReady);
            return callback();
          }
        };
      })(this);
      return this.addEventListener(eventName, onChildrenReady);
    }
  });
  return Object.defineProperty(obj, 'fireReady', {
    value: function() {
      return this.fire(eventName);
    }
  });
};

module.exports = WaitForChildren;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZUZyYWdtZW50LmNvZmZlZSIsIi9Vc2Vycy9kYXZpZC9Eb2N1bWVudHMvV29yay9JbmxpbmVBcnJhbmdlbWVudC9zcmMvV2FpdEZvckNoaWxkcmVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsZUFBQSxHQUFrQixPQUFBLENBQVEsaUJBQVI7O0FBRWxCLFVBQUEsR0FBYSxTQUFDLEdBQUQ7U0FDWCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUExQixDQUErQixHQUEvQixDQUFBLEtBQXVDO0FBRDVCOztBQUdiLFdBQUEsR0FBYyxTQUFDLE9BQUQsRUFBVSxJQUFWO0FBQ1osTUFBQTtFQUFBLENBQUEsR0FBSSxJQUFJLENBQUM7QUFDVCxPQUFTLDhFQUFUO0lBQ0UsSUFBRyxVQUFBLENBQVcsT0FBWCxDQUFIO01BQ0UsSUFBSSxDQUFDLE1BQUwsQ0FBYSxDQUFBLEdBQUksQ0FBSixHQUFRLENBQXJCLEVBQXlCLENBQXpCLEVBQStCLE9BQUgsQ0FBQSxDQUE1QixFQURGO0tBQUEsTUFBQTtNQUdFLElBQUksQ0FBQyxNQUFMLENBQWEsQ0FBQSxHQUFJLENBQUosR0FBUSxDQUFyQixFQUF5QixDQUF6QixFQUE0QixPQUE1QixFQUhGOztBQURGO0FBS0EsU0FBTztBQVBLOztBQVVkLE9BQUEsQ0FDRTtFQUFBLEVBQUEsRUFBSSxpQkFBSjtFQUVBLFVBQUEsRUFDRTtJQUFBLEtBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsS0FBQSxFQUFPLFNBQUE7ZUFBTTtNQUFOLENBRFA7S0FERjtJQUlBLFVBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxNQUFOO01BQ0EsS0FBQSxF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TyxTQUFDLFFBQUQ7QUFDTCxVQUFBO01BQUEsYUFBQSxHQUFnQjtNQUNoQixlQUFBLEdBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFEO1VBQ2hCLEdBQUcsQ0FBQyxlQUFKLENBQUE7VUFDQSxhQUFBO1VBQ0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxrQkFBRCxDQUFBLENBQXFCLENBQUMsTUFBMUM7WUFDRSxLQUFDLENBQUEsbUJBQUQsQ0FBcUIsU0FBckIsRUFBZ0MsZUFBaEM7bUJBQ0csUUFBSCxDQUFBLEVBRkY7O1FBSGdCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTthQU1sQixJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsU0FBbEIsRUFBNkIsZUFBN0I7SUFSSyxDQUFQO0dBREY7U0FxQkEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsV0FBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFBO2FBQU0sSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOO0lBQU4sQ0FBUDtHQURGO0FBdEJnQjs7QUEwQmxCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIldhaXRGb3JDaGlsZHJlbiA9IHJlcXVpcmUgJ1dhaXRGb3JDaGlsZHJlbidcblxuaXNGdW5jdGlvbiA9IChvYmopIC0+XG4gIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopIGlzICdbb2JqZWN0IEZ1bmN0aW9uXSdcblxuaW50ZXJzcGVyc2UgPSAod2l0aEVsbSwgbGlzdCkgLT5cbiAgbCA9IGxpc3QubGVuZ3RoXG4gIGZvciBpIGluIFswLi4uKGwgLSAxKV1cbiAgICBpZiBpc0Z1bmN0aW9uIHdpdGhFbG1cbiAgICAgIGxpc3Quc3BsaWNlIChpICogMiArIDEpLCAwLCBkbyB3aXRoRWxtXG4gICAgZWxzZVxuICAgICAgbGlzdC5zcGxpY2UgKGkgKiAyICsgMSksIDAsIHdpdGhFbG1cbiAgcmV0dXJuIGxpc3RcblxuXG5Qb2x5bWVyXG4gIGlzOiAnaW5saW5lLWZyYWdtZW50J1xuXG4gIHByb3BlcnRpZXM6XG4gICAgbGluZXM6XG4gICAgICB0eXBlOiBBcnJheVxuICAgICAgdmFsdWU6ICgpIC0+IFtdXG5cbiAgICBsaW5lSGVpZ2h0OlxuICAgICAgdHlwZTogTnVtYmVyXG4gICAgICB2YWx1ZTogMjBcbiAgICAgIG9ic2VydmU6ICdfdXBkYXRlTGluZUhlaWdodCdcblxuICBjcmVhdGVkOiAoKSAtPlxuICAgIFdhaXRGb3JDaGlsZHJlbiB0aGlzXG5cbiAgcmVhZHk6ICgpIC0+XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoaXMsICdfbGluZUVsZW1lbnRzJyxcbiAgICAgIGdldDogKCkgLT5cbiAgICAgICAgUG9seW1lci5kb20odGhpcykucXVlcnlTZWxlY3RvckFsbCgnLmxpbmUnKVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoaXMsICdfcGllY2VFbGVtZW50cycsXG4gICAgICBnZXQ6ICgpIC0+XG4gICAgICAgIEBfbGluZUVsZW1lbnRzLnJlZHVjZSAoKHBpZWNlcywgbG4pIC0+XG4gICAgICAgICAgcGllY2VOb2RlTGlzdCA9IGxuLnF1ZXJ5U2VsZWN0b3JBbGwgJ2lubGluZS1waWVjZSdcbiAgICAgICAgICBwaWVjZUFycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwgcGllY2VOb2RlTGlzdFxuICAgICAgICAgIHBpZWNlcy5jb25jYXQgcGllY2VBcnJheSksIFtdXG5cbiAgICBAY2hpbGRyZW5SZWFkeSAoKSA9PlxuICAgICAgIyBjb25zb2xlLmxvZyAnZnJhZ21lbnQgcmVhZHknXG4gICAgICBkbyBAZmlyZVJlYWR5XG5cbiAgcG9wdWxhdGVXaXRoVGV4dDogKHRleHQpIC0+XG4gICAgQGxpbmVzID0gQF90ZXh0VG9MaW5lcyB0ZXh0XG5cbiAgZ2V0V2lkdGg6ICgpIC0+XG4gICAgaWYgQF9saW5lRWxlbWVudHMubGVuZ3RoIGlzIDBcbiAgICB0aGVuIDBcbiAgICBlbHNlXG4gICAgICBAX2xpbmVFbGVtZW50c1xuICAgICAgICAubWFwIEBfZ2V0TGluZVdpZHRoRnJvbUVsZW1lbnRcbiAgICAgICAgLnNvcnQoKGEsIGIpIC0+IGIgLSBhKVswXVxuXG4gIGdldEhlaWdodDogKCkgLT5cbiAgICBpZiBAX2xpbmVFbGVtZW50cy5sZW5ndGggaXMgMFxuICAgIHRoZW4gMFxuICAgIGVsc2VcbiAgICAgIEBfbGluZUVsZW1lbnRzXG4gICAgICAgIC5tYXAgQF9nZXRMaW5lSGVpZ2h0RnJvbUVsZW1lbnRcbiAgICAgICAgLnJlZHVjZSAoKGEsIGIpIC0+IGEgKyBiKSwgMFxuXG4gIGdldExpbmVXaWR0aDogKGxpbmVJbmRleCkgLT5cbiAgICBsbiA9IEBfbGluZUVsZW1lbnRzW2xpbmVJbmRleF1cbiAgICBpZiBsbj9cbiAgICB0aGVuIEBfZ2V0TGluZVdpZHRoRnJvbUVsZW1lbnQgbG5cbiAgICBlbHNlIG51bGxcblxuICBnZXRMaW5lSGVpZ2h0OiAobGluZUluZGV4KSAtPlxuICAgIGxuID0gQF9saW5lRWxlbWVudHNbbGluZUluZGV4XVxuICAgIGlmIGxuP1xuICAgIHRoZW4gQF9nZXRMaW5lSGVpZ2h0RnJvbUVsZW1lbnQgbG5cbiAgICBlbHNlIG51bGxcblxuICBnZXRJbnNlcnRpb25Qb2ludDogKCkgLT5cbiAgICBpZiBAX2xpbmVFbGVtZW50cy5sZW5ndGggaXMgMFxuICAgICAgY29uc29sZS53YXJuICdGcmFnbWVudCBoYXMgbm8gbGluZXMnLCB0aGlzXG4gICAgICB0b3A6IDBcbiAgICAgIGxlZnQ6IDBcbiAgICBlbHNlXG4gICAgICBsYXN0ID0gQF9saW5lRWxlbWVudHMubGVuZ3RoIC0gMVxuXG4gICAgICB0b3A6IEBnZXRIZWlnaHQoKSAtIChAZ2V0TGluZUhlaWdodCBsYXN0KVxuICAgICAgbGVmdDogQGdldExpbmVXaWR0aCBsYXN0XG5cblxuICBfZ2V0TGluZVdpZHRoRnJvbUVsZW1lbnQ6IChsbikgLT5cbiAgICBwaWVjZU5vZGVMaXN0ID0gbG4ucXVlcnlTZWxlY3RvckFsbCAnaW5saW5lLXBpZWNlJ1xuICAgIHBpZWNlQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCBwaWVjZU5vZGVMaXN0XG5cbiAgICBwaWVjZUFycmF5LnJlZHVjZSAoKGxpbmVXaWR0aCwgcGllY2UpIC0+XG4gICAgICBsaW5lV2lkdGggKz0gcGllY2UuZ2V0V2lkdGgoKSksIDBcblxuICBfZ2V0TGluZUhlaWdodEZyb21FbGVtZW50OiAobG4pIC0+XG4gICAgcGllY2VOb2RlTGlzdCA9IGxuLnF1ZXJ5U2VsZWN0b3JBbGwgJ2lubGluZS1waWVjZSdcbiAgICBwaWVjZUFycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwgcGllY2VOb2RlTGlzdFxuICAgIHBpZWNlQXJyYXkucmVkdWNlICgobGluZUhlaWdodCwgcGllY2UpIC0+XG4gICAgICBNYXRoLm1heCBsaW5lSGVpZ2h0LCBwaWVjZS5nZXRIZWlnaHQoKSksIDBcblxuICAjIF90ZXh0VG9MaW5lczogKHRleHQpIC0+XG4gICMgICB0ZXh0XG4gICMgICAgIC5zcGxpdCAnXFxuJ1xuICAjICAgICAubWFwIChsaW5lKSA9PlxuICAjICAgICAgIGwgPSBsaW5lXG4gICMgICAgICAgICAuc3BsaXQgJ1xcdCdcbiAgIyAgICAgICAgIC5tYXAgKGVsbSkgLT5cbiAgIyAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICMgICAgICAgICAgIHZhbHVlOiBlbG1cbiAgIyAgICAgICByZXR1cm4gaW50ZXJzcGVyc2UgQF9tYWtlVGFiRWxlbWVudCwgbFxuICAjICAgICAgICAgLmZpbHRlciAoZWxtKSAtPiBub3QgKGVsbS50eXBlIGlzICd0ZXh0JyBhbmQgZWxtLnZhbHVlLmxlbmd0aCBpcyAwKVxuXG4gICMgX21ha2VUYWJFbGVtZW50OiAoKSAtPlxuICAjICAgdHlwZTogJ3RhYidcblxuICAjIF9jaGVja0ZpZWxkOiAob2JqLCBmaWVsZCwgZmllbGRWYWwpIC0+XG4gICMgICBvYmpbZmllbGRdIGlzIGZpZWxkVmFsIiwiXG4jIyNcbk1peGluIHRvIGhhdmUgYW4gZWxlbWVudCBjYWxsIGEgY2FsbGJhY2sgb25jZSBhbGwgZGlzdHJpYnV0ZWQgY2hpbGRyZW4gaGF2ZVxuICBzaWduYWxsZWQgcmVhZHkuXG4jIyNcbldhaXRGb3JDaGlsZHJlbiA9IChvYmosIGV2ZW50TmFtZSA9ICdjaGlsZC1yZWFkeScpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdjaGlsZHJlblJlYWR5JyxcbiAgICB2YWx1ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgcmVjZWl2ZWRDb3VudCA9IDBcbiAgICAgIG9uQ2hpbGRyZW5SZWFkeSA9IChldnQpID0+XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZWNlaXZlZENvdW50KytcbiAgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgICAgICAgICBkbyBjYWxsYmFja1xuICAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICAjIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdidWJibGVDaGlsZHJlblJlYWR5JyxcbiAgIyAgIHZhbHVlOiAoKSAtPlxuICAjICAgICByZWNlaXZlZENvdW50ID0gMFxuICAjICAgICBvbkNoaWxkcmVuUmVhZHkgPSAoKSA9PlxuICAjICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAjICAgICAgIGlmIHJlY2VpdmVkQ291bnQgaXMgQGdldENvbnRlbnRDaGlsZHJlbigpLmxlbmd0aFxuICAjICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgIyAgICAgICAgIGRvIEBmaXJlUmVhZHlcbiAgIyAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgb2JqLCAnZmlyZVJlYWR5JyxcbiAgICB2YWx1ZTogKCkgLT4gQGZpcmUgZXZlbnROYW1lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBXYWl0Rm9yQ2hpbGRyZW4iXX0=
