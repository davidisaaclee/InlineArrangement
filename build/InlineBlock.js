(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var InlineBlock, WaitForChildren;

WaitForChildren = require('WaitForChildren');

InlineBlock = Polymer({
  is: 'inline-block',
  created: function() {
    return WaitForChildren(this);
  },
  ready: function() {
    this._blockWidth = 0;
    this._blockHeight = 0;
    return this.childrenReady((function(_this) {
      return function() {
        _this._positionChildren();
        return _this.fireReady();
      };
    })(this));
  },
  attached: function() {},
  getDimensions: function() {
    return this.getBoundingClientRect();
  },
  getWidth: function() {
    return this._blockWidth;
  },
  getHeight: function() {
    return this._blockHeight;
  },
  getInsertionPoint: function() {
    return this.getContentChildren().reduce(((function(_this) {
      return function(insertPt, child) {
        var left, ref, top;
        ref = child.getInsertionPoint(), left = ref.left, top = ref.top;
        insertPt.left += left;
        insertPt.top += top;
        return insertPt;
      };
    })(this)), {
      left: 0,
      top: 0
    });
  },
  _positionChildren: function() {
    this._insertPoint = {
      left: 0,
      top: 0
    };
    this._blockWidth = 0;
    this._blockHeight = 0;
    this.getContentChildren().forEach((function(_this) {
      return function(child) {
        var insertPt;
        _this._blockWidth = Math.max(_this._blockWidth, _this._insertPoint.left + child.getWidth());
        _this._blockHeight = Math.max(_this._blockHeight, _this._insertPoint.top + child.getHeight());
        if (child.getHeight() === 0) {
          console.log(child);
        }
        insertPt = child.getInsertionPoint();
        Polymer.dom(_this.root).appendChild(child);
        child.style.left = _this._insertPoint.left + "px";
        child.style.top = _this._insertPoint.top + "px";
        _this._insertPoint.left += insertPt.left;
        return _this._insertPoint.top += insertPt.top;
      };
    })(this));
    this.style.width = this._blockWidth + "px";
    return this.style.height = this._blockHeight + "px";
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZUJsb2NrLmNvZmZlZSIsIi9Vc2Vycy9kYXZpZC9Eb2N1bWVudHMvV29yay9JbmxpbmVBcnJhbmdlbWVudC9zcmMvV2FpdEZvckNoaWxkcmVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsZUFBQSxHQUFrQixPQUFBLENBQVEsaUJBQVI7O0FBRWxCLFdBQUEsR0FBYyxPQUFBLENBQ1o7RUFBQSxFQUFBLEVBQUksY0FBSjtFQVVBLE9BQUEsRUFBUyxTQUFBO1dBQ1AsZUFBQSxDQUFnQixJQUFoQjtFQURPLENBVlQ7RUFhQSxLQUFBLEVBQU8sU0FBQTtJQUNMLElBQUMsQ0FBQSxXQUFELEdBQWU7SUFDZixJQUFDLENBQUEsWUFBRCxHQUFnQjtXQUVoQixJQUFDLENBQUEsYUFBRCxDQUFlLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUViLEtBQUMsQ0FBQSxpQkFBRCxDQUFBO2VBQ0csS0FBQyxDQUFBLFNBQUosQ0FBQTtNQUhhO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmO0VBSkssQ0FiUDtFQXNCQSxRQUFBLEVBQVUsU0FBQSxHQUFBLENBdEJWO0VBNEJBLGFBQUEsRUFBZSxTQUFBO1dBQ2IsSUFBQyxDQUFBLHFCQUFELENBQUE7RUFEYSxDQTVCZjtFQStCQSxRQUFBLEVBQVUsU0FBQTtXQUVSLElBQUMsQ0FBQTtFQUZPLENBL0JWO0VBb0NBLFNBQUEsRUFBVyxTQUFBO1dBRVQsSUFBQyxDQUFBO0VBRlEsQ0FwQ1g7RUF5Q0EsaUJBQUEsRUFBbUIsU0FBQTtXQUNqQixJQUFDLENBQUEsa0JBQUQsQ0FBQSxDQUNFLENBQUMsTUFESCxDQUNVLENBQUMsQ0FBQSxTQUFBLEtBQUE7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U0FxQkEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsV0FBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFBO2FBQU0sSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOO0lBQU4sQ0FBUDtHQURGO0FBdEJnQjs7QUEwQmxCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIldhaXRGb3JDaGlsZHJlbiA9IHJlcXVpcmUgJ1dhaXRGb3JDaGlsZHJlbidcblxuSW5saW5lQmxvY2sgPSBQb2x5bWVyXG4gIGlzOiAnaW5saW5lLWJsb2NrJ1xuXG4gICMgcHJvcGVydGllczpcbiAgICAjIHNvZnRXcmFwOlxuICAgICMgICB0eXBlOiBCb29sZWFuXG4gICAgIyAgIHZhbHVlOiB0cnVlXG4gICAgIyB3b3JkV3JhcENvbHVtblB4OlxuICAgICMgICB0eXBlOiBTdHJpbmdcbiAgICAjICAgdmFsdWU6IDMwMFxuXG4gIGNyZWF0ZWQ6ICgpIC0+XG4gICAgV2FpdEZvckNoaWxkcmVuIHRoaXNcblxuICByZWFkeTogKCkgLT5cbiAgICBAX2Jsb2NrV2lkdGggPSAwXG4gICAgQF9ibG9ja0hlaWdodCA9IDBcblxuICAgIEBjaGlsZHJlblJlYWR5ICgpID0+XG4gICAgICAjIGNvbnNvbGUubG9nICdibG9jayByZWFkeSdcbiAgICAgIEBfcG9zaXRpb25DaGlsZHJlbigpXG4gICAgICBkbyBAZmlyZVJlYWR5XG5cbiAgYXR0YWNoZWQ6ICgpIC0+XG4gICAgIyBAYXN5bmMgQF9wb3NpdGlvbkNoaWxkcmVuLCAxXG5cbiAgIyB1cGRhdGU6ICgpIC0+XG4gICMgICBAX3Bvc2l0aW9uQ2hpbGRyZW4oKVxuXG4gIGdldERpbWVuc2lvbnM6ICgpIC0+XG4gICAgQGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgZ2V0V2lkdGg6ICgpIC0+XG4gICAgIyBAZ2V0RGltZW5zaW9ucygpLndpZHRoXG4gICAgQF9ibG9ja1dpZHRoXG4gICAgIyBAb2Zmc2V0V2lkdGhcblxuICBnZXRIZWlnaHQ6ICgpIC0+XG4gICAgIyBAZ2V0RGltZW5zaW9ucygpLmhlaWdodFxuICAgIEBfYmxvY2tIZWlnaHRcbiAgICAjIEBvZmZzZXRIZWlnaHRcblxuICBnZXRJbnNlcnRpb25Qb2ludDogKCkgLT5cbiAgICBAZ2V0Q29udGVudENoaWxkcmVuKClcbiAgICAgIC5yZWR1Y2UgKChpbnNlcnRQdCwgY2hpbGQpID0+XG4gICAgICAgIHtsZWZ0LCB0b3B9ID0gY2hpbGQuZ2V0SW5zZXJ0aW9uUG9pbnQoKVxuICAgICAgICBpbnNlcnRQdC5sZWZ0ICs9IGxlZnRcbiAgICAgICAgaW5zZXJ0UHQudG9wICs9IHRvcFxuICAgICAgICByZXR1cm4gaW5zZXJ0UHQpLCB7bGVmdDogMCwgdG9wOiAwfVxuXG4gIF9wb3NpdGlvbkNoaWxkcmVuOiAoKSAtPlxuICAgIEBfaW5zZXJ0UG9pbnQgPVxuICAgICAgbGVmdDogMFxuICAgICAgdG9wOiAwXG5cbiAgICBAX2Jsb2NrV2lkdGggPSAwXG4gICAgQF9ibG9ja0hlaWdodCA9IDBcblxuICAgIEBnZXRDb250ZW50Q2hpbGRyZW4oKVxuICAgICAgLmZvckVhY2ggKGNoaWxkKSA9PlxuICAgICAgICBAX2Jsb2NrV2lkdGggPSBNYXRoLm1heChAX2Jsb2NrV2lkdGgsIEBfaW5zZXJ0UG9pbnQubGVmdCArIGNoaWxkLmdldFdpZHRoKCkpXG4gICAgICAgIEBfYmxvY2tIZWlnaHQgPSBNYXRoLm1heChAX2Jsb2NrSGVpZ2h0LCBAX2luc2VydFBvaW50LnRvcCArIGNoaWxkLmdldEhlaWdodCgpKVxuXG4gICAgICAgIGlmIGNoaWxkLmdldEhlaWdodCgpIGlzIDBcbiAgICAgICAgICBjb25zb2xlLmxvZyBjaGlsZFxuXG4gICAgICAgIGluc2VydFB0ID0gY2hpbGQuZ2V0SW5zZXJ0aW9uUG9pbnQoKVxuXG4gICAgICAgIFBvbHltZXIuZG9tKEByb290KS5hcHBlbmRDaGlsZCBjaGlsZFxuXG4gICAgICAgIGNoaWxkLnN0eWxlLmxlZnQgPSBcIiN7QF9pbnNlcnRQb2ludC5sZWZ0fXB4XCJcbiAgICAgICAgY2hpbGQuc3R5bGUudG9wID0gXCIje0BfaW5zZXJ0UG9pbnQudG9wfXB4XCJcblxuICAgICAgICBAX2luc2VydFBvaW50LmxlZnQgKz0gaW5zZXJ0UHQubGVmdFxuICAgICAgICBAX2luc2VydFBvaW50LnRvcCArPSBpbnNlcnRQdC50b3BcblxuICAgIEBzdHlsZS53aWR0aCA9IFwiI3tAX2Jsb2NrV2lkdGh9cHhcIlxuICAgIEBzdHlsZS5oZWlnaHQgPSBcIiN7QF9ibG9ja0hlaWdodH1weFwiIiwiXG4jIyNcbk1peGluIHRvIGhhdmUgYW4gZWxlbWVudCBjYWxsIGEgY2FsbGJhY2sgb25jZSBhbGwgZGlzdHJpYnV0ZWQgY2hpbGRyZW4gaGF2ZVxuICBzaWduYWxsZWQgcmVhZHkuXG4jIyNcbldhaXRGb3JDaGlsZHJlbiA9IChvYmosIGV2ZW50TmFtZSA9ICdjaGlsZC1yZWFkeScpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdjaGlsZHJlblJlYWR5JyxcbiAgICB2YWx1ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgcmVjZWl2ZWRDb3VudCA9IDBcbiAgICAgIG9uQ2hpbGRyZW5SZWFkeSA9IChldnQpID0+XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZWNlaXZlZENvdW50KytcbiAgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgICAgICAgICBkbyBjYWxsYmFja1xuICAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICAjIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdidWJibGVDaGlsZHJlblJlYWR5JyxcbiAgIyAgIHZhbHVlOiAoKSAtPlxuICAjICAgICByZWNlaXZlZENvdW50ID0gMFxuICAjICAgICBvbkNoaWxkcmVuUmVhZHkgPSAoKSA9PlxuICAjICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAjICAgICAgIGlmIHJlY2VpdmVkQ291bnQgaXMgQGdldENvbnRlbnRDaGlsZHJlbigpLmxlbmd0aFxuICAjICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgIyAgICAgICAgIGRvIEBmaXJlUmVhZHlcbiAgIyAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgb2JqLCAnZmlyZVJlYWR5JyxcbiAgICB2YWx1ZTogKCkgLT4gQGZpcmUgZXZlbnROYW1lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBXYWl0Rm9yQ2hpbGRyZW4iXX0=
