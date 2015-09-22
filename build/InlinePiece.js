(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WaitForChildren;

WaitForChildren = require('WaitForChildren');

Polymer({
  is: 'inline-piece',
  properties: {
    text: {
      type: String,
      value: 'null'
    },
    lineHeight: {
      type: Number,
      value: 20
    }
  },
  created: function() {
    return WaitForChildren(this);
  },
  ready: function() {
    return this.style.height = this.lineHeight + "px";
  },
  attached: function() {
    return this.fireReady();
  },
  getWidth: function() {
    return this.getBoundingClientRect().width;
  },
  getHeight: function() {
    return this.getBoundingClientRect().height;
  }
});

Polymer({
  is: 'inline-tabstop',
  created: function() {
    return WaitForChildren(this);
  },
  ready: function() {
    return this.fireReady();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZVBpZWNlLmNvZmZlZSIsIi9Vc2Vycy9kYXZpZC9Eb2N1bWVudHMvV29yay9JbmxpbmVBcnJhbmdlbWVudC9zcmMvV2FpdEZvckNoaWxkcmVuLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsZUFBQSxHQUFrQixPQUFBLENBQVEsaUJBQVI7O0FBRWxCLE9BQUEsQ0FDRTtFQUFBLEVBQUEsRUFBSSxjQUFKO0VBRUEsVUFBQSxFQUNFO0lBQUEsSUFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxLQUFBLEVBQU8sTUFEUDtLQURGO0lBR0EsVUFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxLQUFBLEVBQU8sRUFEUDtLQUpGO0dBSEY7RUFVQSxPQUFBLEVBQVMsU0FBQTtXQUNQLGVBQUEsQ0FBZ0IsSUFBaEI7RUFETyxDQVZUO0VBYUEsS0FBQSxFQUFPLFNBQUE7V0FDTCxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBbUIsSUFBQyxDQUFBLFVBQUYsR0FBYTtFQUQxQixDQWJQO0VBZ0JBLFFBQUEsRUFBVSxTQUFBO1dBQ0wsSUFBQyxDQUFBLFNBQUosQ0FBQTtFQURRLENBaEJWO0VBbUJBLFFBQUEsRUFBVSxTQUFBO1dBQ1IsSUFBQyxDQUFBLHFCQUFELENBQUEsQ0FBd0IsQ0FBQztFQURqQixDQW5CVjtFQXNCQSxTQUFBLEVBQVcsU0FBQTtXQUNULElBQUMsQ0FBQSxxQkFBRCxDQUFBLENBQXdCLENBQUM7RUFEaEIsQ0F0Qlg7Q0FERjs7QUEyQkEsT0FBQSxDQUNFO0VBQUEsRUFBQSxFQUFJLGdCQUFKO0VBRUEsT0FBQSxFQUFTLFNBQUE7V0FDUCxlQUFBLENBQWdCLElBQWhCO0VBRE8sQ0FGVDtFQUtBLEtBQUEsRUFBTyxTQUFBO1dBQ0YsSUFBQyxDQUFBLFNBQUosQ0FBQTtFQURLLENBTFA7Q0FERjs7Ozs7QUM1QkE7Ozs7QUFBQSxJQUFBOztBQUlBLGVBQUEsR0FBa0IsU0FBQyxHQUFELEVBQU0sU0FBTjs7SUFBTSxZQUFZOztFQUNsQyxNQUFNLENBQUMsY0FBUCxDQUFzQixHQUF0QixFQUEyQixlQUEzQixFQUNFO0lBQUEsS0FBQSxFQUFPLFNBQUMsUUFBRDtBQUNMLFVBQUE7TUFBQSxhQUFBLEdBQWdCO01BQ2hCLGVBQUEsR0FBa0IsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLEdBQUQ7VUFDaEIsR0FBRyxDQUFDLGVBQUosQ0FBQTtVQUNBLGFBQUE7VUFDQSxJQUFHLGFBQUEsS0FBaUIsS0FBQyxDQUFBLGtCQUFELENBQUEsQ0FBcUIsQ0FBQyxNQUExQztZQUNFLEtBQUMsQ0FBQSxtQkFBRCxDQUFxQixTQUFyQixFQUFnQyxlQUFoQzttQkFDRyxRQUFILENBQUEsRUFGRjs7UUFIZ0I7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO2FBTWxCLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixTQUFsQixFQUE2QixlQUE3QjtJQVJLLENBQVA7R0FERjtTQXFCQSxNQUFNLENBQUMsY0FBUCxDQUFzQixHQUF0QixFQUEyQixXQUEzQixFQUNFO0lBQUEsS0FBQSxFQUFPLFNBQUE7YUFBTSxJQUFDLENBQUEsSUFBRCxDQUFNLFNBQU47SUFBTixDQUFQO0dBREY7QUF0QmdCOztBQTBCbEIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiV2FpdEZvckNoaWxkcmVuID0gcmVxdWlyZSAnV2FpdEZvckNoaWxkcmVuJ1xuXG5Qb2x5bWVyXG4gIGlzOiAnaW5saW5lLXBpZWNlJ1xuXG4gIHByb3BlcnRpZXM6XG4gICAgdGV4dDpcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgdmFsdWU6ICdudWxsJ1xuICAgIGxpbmVIZWlnaHQ6XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICAgIHZhbHVlOiAyMFxuXG4gIGNyZWF0ZWQ6ICgpIC0+XG4gICAgV2FpdEZvckNoaWxkcmVuIHRoaXNcblxuICByZWFkeTogKCkgLT5cbiAgICBAc3R5bGUuaGVpZ2h0ID0gXCIje0BsaW5lSGVpZ2h0fXB4XCJcblxuICBhdHRhY2hlZDogKCkgLT5cbiAgICBkbyBAZmlyZVJlYWR5XG5cbiAgZ2V0V2lkdGg6ICgpIC0+XG4gICAgQGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cbiAgZ2V0SGVpZ2h0OiAoKSAtPlxuICAgIEBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuXG5Qb2x5bWVyXG4gIGlzOiAnaW5saW5lLXRhYnN0b3AnXG5cbiAgY3JlYXRlZDogKCkgLT5cbiAgICBXYWl0Rm9yQ2hpbGRyZW4gdGhpc1xuXG4gIHJlYWR5OiAoKSAtPlxuICAgIGRvIEBmaXJlUmVhZHkiLCJcbiMjI1xuTWl4aW4gdG8gaGF2ZSBhbiBlbGVtZW50IGNhbGwgYSBjYWxsYmFjayBvbmNlIGFsbCBkaXN0cmlidXRlZCBjaGlsZHJlbiBoYXZlXG4gIHNpZ25hbGxlZCByZWFkeS5cbiMjI1xuV2FpdEZvckNoaWxkcmVuID0gKG9iaiwgZXZlbnROYW1lID0gJ2NoaWxkLXJlYWR5JykgLT5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9iaiwgJ2NoaWxkcmVuUmVhZHknLFxuICAgIHZhbHVlOiAoY2FsbGJhY2spIC0+XG4gICAgICByZWNlaXZlZENvdW50ID0gMFxuICAgICAgb25DaGlsZHJlblJlYWR5ID0gKGV2dCkgPT5cbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAgICAgICBpZiByZWNlaXZlZENvdW50IGlzIEBnZXRDb250ZW50Q2hpbGRyZW4oKS5sZW5ndGhcbiAgICAgICAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuICAgICAgICAgIGRvIGNhbGxiYWNrXG4gICAgICBAYWRkRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuXG4gICMgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9iaiwgJ2J1YmJsZUNoaWxkcmVuUmVhZHknLFxuICAjICAgdmFsdWU6ICgpIC0+XG4gICMgICAgIHJlY2VpdmVkQ291bnQgPSAwXG4gICMgICAgIG9uQ2hpbGRyZW5SZWFkeSA9ICgpID0+XG4gICMgICAgICAgcmVjZWl2ZWRDb3VudCsrXG4gICMgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICMgICAgICAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuICAjICAgICAgICAgZG8gQGZpcmVSZWFkeVxuICAjICAgICBAYWRkRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdmaXJlUmVhZHknLFxuICAgIHZhbHVlOiAoKSAtPiBAZmlyZSBldmVudE5hbWVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhaXRGb3JDaGlsZHJlbiJdfQ==
