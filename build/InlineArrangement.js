(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var InlineArrangement, WaitForChildren;

WaitForChildren = require('WaitForChildren');

InlineArrangement = Polymer({
  is: 'inline-arrangement',
  created: function() {
    return WaitForChildren(this);
  },
  ready: function() {},
  attached: function() {
    return this.async((function(_this) {
      return function() {};
    })(this));
  },
  update: function() {
    this.childrenReady((function(_this) {
      return function() {
        console.log('children ready');
        return _this.getContentChildren().forEach(function(child) {
          return console.log('updating ', child);
        });
      };
    })(this));
    this.distributeContent();
    this.async((function(_this) {
      return function() {
        return console.log('async', _this.getContentChildren());
      };
    })(this));
    return console.log('sync', this.getContentChildren());
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZUFycmFuZ2VtZW50LmNvZmZlZSIsIi9Vc2Vycy9kYXZpZC9Eb2N1bWVudHMvV29yay9JbmxpbmVBcnJhbmdlbWVudC9zcmMvV2FpdEZvckNoaWxkcmVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsZUFBQSxHQUFrQixPQUFBLENBQVEsaUJBQVI7O0FBRWxCLGlCQUFBLEdBQW9CLE9BQUEsQ0FDbEI7RUFBQSxFQUFBLEVBQUksb0JBQUo7RUFhQSxPQUFBLEVBQVMsU0FBQTtXQUNQLGVBQUEsQ0FBZ0IsSUFBaEI7RUFETyxDQWJUO0VBZ0JBLEtBQUEsRUFBTyxTQUFBLEdBQUEsQ0FoQlA7RUFrQkEsUUFBQSxFQUFVLFNBQUE7V0FFUixJQUFDLENBQUEsS0FBRCxDQUFPLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQSxHQUFBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFQO0VBRlEsQ0FsQlY7RUFzQkEsTUFBQSxFQUFRLFNBQUE7SUFDTixJQUFDLENBQUEsYUFBRCxDQUFlLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNiLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVo7ZUFDQSxLQUFDLENBQUEsa0JBQUQsQ0FBQSxDQUNFLENBQUMsT0FESCxDQUNXLFNBQUMsS0FBRDtpQkFDUCxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVosRUFBeUIsS0FBekI7UUFETyxDQURYO01BRmE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWY7SUFZQSxJQUFDLENBQUEsaUJBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxLQUFELENBQU8sQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ0wsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLEtBQUMsQ0FBQSxrQkFBRCxDQUFBLENBQXJCO01BREs7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVA7V0FFQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQVosRUFBb0IsSUFBQyxDQUFBLGtCQUFELENBQUEsQ0FBcEI7RUFoQk0sQ0F0QlI7Q0FEa0I7Ozs7O0FDRHBCOzs7O0FBQUEsSUFBQTs7QUFJQSxlQUFBLEdBQWtCLFNBQUMsR0FBRCxFQUFNLFNBQU47O0lBQU0sWUFBWTs7RUFDbEMsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsZUFBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFDLFFBQUQ7QUFDTCxVQUFBO01BQUEsYUFBQSxHQUFnQjtNQUNoQixlQUFBLEdBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFEO1VBQ2hCLEdBQUcsQ0FBQyxlQUFKLENBQUE7VUFDQSxhQUFBO1VBQ0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxrQkFBRCxDQUFBLENBQXFCLENBQUMsTUFBMUM7WUFDRSxLQUFDLENBQUEsbUJBQUQsQ0FBcUIsU0FBckIsRUFBZ0MsZUFBaEM7bUJBQ0csUUFBSCxDQUFBLEVBRkY7O1FBSGdCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTthQU1sQixJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsU0FBbEIsRUFBNkIsZUFBN0I7SUFSSyxDQUFQO0dBREY7U0FxQkEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsV0FBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFBO2FBQU0sSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOO0lBQU4sQ0FBUDtHQURGO0FBdEJnQjs7QUEwQmxCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIldhaXRGb3JDaGlsZHJlbiA9IHJlcXVpcmUgJ1dhaXRGb3JDaGlsZHJlbidcblxuSW5saW5lQXJyYW5nZW1lbnQgPSBQb2x5bWVyXG4gIGlzOiAnaW5saW5lLWFycmFuZ2VtZW50J1xuXG4gICMgcHJvcGVydGllczpcbiAgICAjIGxpbmVIZWlnaHQ6XG4gICAgIyAgIHR5cGU6IE51bWJlclxuICAgICMgICB2YWx1ZTogMjBcbiAgICAjIHNvZnRXcmFwOlxuICAgICMgICB0eXBlOiBCb29sZWFuXG4gICAgIyAgIHZhbHVlOiB0cnVlXG4gICAgIyB3b3JkV3JhcENvbHVtblB4OlxuICAgICMgICB0eXBlOiBTdHJpbmdcbiAgICAjICAgdmFsdWU6IDMwMFxuXG4gIGNyZWF0ZWQ6ICgpIC0+XG4gICAgV2FpdEZvckNoaWxkcmVuIHRoaXNcblxuICByZWFkeTogKCkgLT5cblxuICBhdHRhY2hlZDogKCkgLT5cbiAgICAjIGNvbnNvbGUubG9nICdpbmxpbmUtYXJyYW5nZW1lbnQgYXR0YWNoZWQnXG4gICAgQGFzeW5jID0+XG5cbiAgdXBkYXRlOiAoKSAtPlxuICAgIEBjaGlsZHJlblJlYWR5ICgpID0+XG4gICAgICBjb25zb2xlLmxvZyAnY2hpbGRyZW4gcmVhZHknXG4gICAgICBAZ2V0Q29udGVudENoaWxkcmVuKClcbiAgICAgICAgLmZvckVhY2ggKGNoaWxkKSAtPlxuICAgICAgICAgIGNvbnNvbGUubG9nICd1cGRhdGluZyAnLCBjaGlsZFxuICAgICAgICAgICMgY2hpbGQudXBkYXRlKClcblxuICAgICMgY29uc29sZS5sb2cgQGNoaWxkcmVuXG4gICAgICAjIC5mb3JFYWNoIChjaGlsZCkgLT5cbiAgICAgICMgICBjb25zb2xlLmxvZyAndXBkYXRpbmcgJywgY2hpbGRcbiAgICAgICMgICBjaGlsZC51cGRhdGUoKVxuXG4gICAgQGRpc3RyaWJ1dGVDb250ZW50KClcbiAgICBAYXN5bmMgKCkgPT5cbiAgICAgIGNvbnNvbGUubG9nICdhc3luYycsIEBnZXRDb250ZW50Q2hpbGRyZW4oKVxuICAgIGNvbnNvbGUubG9nICdzeW5jJywgQGdldENvbnRlbnRDaGlsZHJlbigpIiwiXG4jIyNcbk1peGluIHRvIGhhdmUgYW4gZWxlbWVudCBjYWxsIGEgY2FsbGJhY2sgb25jZSBhbGwgZGlzdHJpYnV0ZWQgY2hpbGRyZW4gaGF2ZVxuICBzaWduYWxsZWQgcmVhZHkuXG4jIyNcbldhaXRGb3JDaGlsZHJlbiA9IChvYmosIGV2ZW50TmFtZSA9ICdjaGlsZC1yZWFkeScpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdjaGlsZHJlblJlYWR5JyxcbiAgICB2YWx1ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgcmVjZWl2ZWRDb3VudCA9IDBcbiAgICAgIG9uQ2hpbGRyZW5SZWFkeSA9IChldnQpID0+XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZWNlaXZlZENvdW50KytcbiAgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgICAgICAgICBkbyBjYWxsYmFja1xuICAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICAjIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdidWJibGVDaGlsZHJlblJlYWR5JyxcbiAgIyAgIHZhbHVlOiAoKSAtPlxuICAjICAgICByZWNlaXZlZENvdW50ID0gMFxuICAjICAgICBvbkNoaWxkcmVuUmVhZHkgPSAoKSA9PlxuICAjICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAjICAgICAgIGlmIHJlY2VpdmVkQ291bnQgaXMgQGdldENvbnRlbnRDaGlsZHJlbigpLmxlbmd0aFxuICAjICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgIyAgICAgICAgIGRvIEBmaXJlUmVhZHlcbiAgIyAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgb2JqLCAnZmlyZVJlYWR5JyxcbiAgICB2YWx1ZTogKCkgLT4gQGZpcmUgZXZlbnROYW1lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBXYWl0Rm9yQ2hpbGRyZW4iXX0=
