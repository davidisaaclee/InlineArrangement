(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WaitForChildren;

WaitForChildren = require('WaitForChildren');

Polymer({
  is: 'inline-line',
  properties: {
    indent: {
      type: Number,
      value: 0
    },
    childrenSelector: {
      type: String,
      value: 'inline-node, inline-piece'
    }
  },
  created: function() {
    return WaitForChildren(this);
  },
  ready: function() {
    return this.childrenReady((function(_this) {
      return function() {
        _this._populateLines();
        return _this.fireReady();
      };
    })(this));
  },

  /*
  Return ::= Line
  Context ::= Array<Line>
  Line ::=
    pieces: Array<inline-piece | Context>
    tabstops: Number
   */
  getLine: function() {
    if (this._line != null) {
      return this._line;
    } else {
      this._populateLines();
      return this._line;
    }
  },
  _populateLines: function() {
    var collectLines, indentLevel;
    collectLines = function(line, child) {
      switch (child.tagName.toLowerCase()) {
        case 'inline-piece':
          line.pieces.push({
            type: 'piece',
            piece: child
          });
          return line;
        case 'inline-node':
          line.pieces.push({
            type: 'context',
            lines: child.getLines(),
            node: child
          });
          return line;
        default:
          return console.error('No case for ', child);
      }
    };
    indentLevel = this.indent;
    return this._line = this.getContentChildren().reduce(collectLines, {
      type: 'line',
      pieces: [],
      tabstops: indentLevel
    });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZUxpbmUuY29mZmVlIiwiL1VzZXJzL2RhdmlkL0RvY3VtZW50cy9Xb3JrL0lubGluZUFycmFuZ2VtZW50L3NyYy9XYWl0Rm9yQ2hpbGRyZW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxpQkFBUjs7QUFFbEIsT0FBQSxDQUNFO0VBQUEsRUFBQSxFQUFJLGFBQUo7RUFFQSxVQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLEtBQUEsRUFBTyxDQURQO0tBREY7SUFHQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxLQUFBLEVBQU8sMkJBRFA7S0FKRjtHQUhGO0VBVUEsT0FBQSxFQUFTLFNBQUE7V0FDUCxlQUFBLENBQWdCLElBQWhCO0VBRE8sQ0FWVDtFQWFBLEtBQUEsRUFBTyxTQUFBO1dBQ0wsSUFBQyxDQUFBLGFBQUQsQ0FBZSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDYixLQUFDLENBQUEsY0FBRCxDQUFBO2VBQ0EsS0FBQyxDQUFBLFNBQUQsQ0FBQTtNQUZhO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmO0VBREssQ0FiUDs7QUFrQkE7Ozs7Ozs7RUFPQSxPQUFBLEVBQVMsU0FBQTtJQUNQLElBQUcsa0JBQUg7YUFDSyxJQUFDLENBQUEsTUFETjtLQUFBLE1BQUE7TUFHRSxJQUFDLENBQUEsY0FBRCxDQUFBO0FBQ0EsYUFBTyxJQUFDLENBQUEsTUFKVjs7RUFETyxDQXpCVDtFQWdDQSxjQUFBLEVBQWdCLFNBQUE7QUFDZCxRQUFBO0lBQUEsWUFBQSxHQUFlLFNBQUMsSUFBRCxFQUFPLEtBQVA7QUFDYixjQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBZCxDQUFBLENBQVA7QUFBQSxhQUlPLGNBSlA7VUFLSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQVosQ0FDRTtZQUFBLElBQUEsRUFBTSxPQUFOO1lBQ0EsS0FBQSxFQUFPLEtBRFA7V0FERjtBQUdBLGlCQUFPO0FBUlgsYUFTTyxhQVRQO1VBVUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFaLENBQ0U7WUFBQSxJQUFBLEVBQU0sU0FBTjtZQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsUUFBTixDQUFBLENBRFA7WUFFQSxJQUFBLEVBQU0sS0FGTjtXQURGO0FBSUEsaUJBQU87QUFkWDtpQkFnQkksT0FBTyxDQUFDLEtBQVIsQ0FBYyxjQUFkLEVBQThCLEtBQTlCO0FBaEJKO0lBRGE7SUFtQmYsV0FBQSxHQUFjLElBQUMsQ0FBQTtXQUNmLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLGtCQUFELENBQUEsQ0FDUCxDQUFDLE1BRE0sQ0FDQyxZQURELEVBQ2U7TUFBQyxJQUFBLEVBQU0sTUFBUDtNQUFlLE1BQUEsRUFBUSxFQUF2QjtNQUEyQixRQUFBLEVBQVUsV0FBckM7S0FEZjtFQXJCSyxDQWhDaEI7Q0FERjs7Ozs7QUNEQTs7OztBQUFBLElBQUE7O0FBSUEsZUFBQSxHQUFrQixTQUFDLEdBQUQsRUFBTSxTQUFOOztJQUFNLFlBQVk7O0VBQ2xDLE1BQU0sQ0FBQyxjQUFQLENBQXNCLEdBQXRCLEVBQTJCLGVBQTNCLEVBQ0U7SUFBQSxLQUFBLEVBQU8sU0FBQyxRQUFEO0FBQ0wsVUFBQTtNQUFBLGFBQUEsR0FBZ0I7TUFDaEIsZUFBQSxHQUFrQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsR0FBRDtVQUNoQixHQUFHLENBQUMsZUFBSixDQUFBO1VBQ0EsYUFBQTtVQUNBLElBQUcsYUFBQSxLQUFpQixLQUFDLENBQUEsa0JBQUQsQ0FBQSxDQUFxQixDQUFDLE1BQTFDO1lBQ0UsS0FBQyxDQUFBLG1CQUFELENBQXFCLFNBQXJCLEVBQWdDLGVBQWhDO21CQUNHLFFBQUgsQ0FBQSxFQUZGOztRQUhnQjtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7YUFNbEIsSUFBQyxDQUFBLGdCQUFELENBQWtCLFNBQWxCLEVBQTZCLGVBQTdCO0lBUkssQ0FBUDtHQURGO1NBcUJBLE1BQU0sQ0FBQyxjQUFQLENBQXNCLEdBQXRCLEVBQTJCLFdBQTNCLEVBQ0U7SUFBQSxLQUFBLEVBQU8sU0FBQTthQUFNLElBQUMsQ0FBQSxJQUFELENBQU0sU0FBTjtJQUFOLENBQVA7R0FERjtBQXRCZ0I7O0FBMEJsQixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJXYWl0Rm9yQ2hpbGRyZW4gPSByZXF1aXJlICdXYWl0Rm9yQ2hpbGRyZW4nXG5cblBvbHltZXJcbiAgaXM6ICdpbmxpbmUtbGluZSdcblxuICBwcm9wZXJ0aWVzOlxuICAgIGluZGVudDpcbiAgICAgIHR5cGU6IE51bWJlclxuICAgICAgdmFsdWU6IDBcbiAgICBjaGlsZHJlblNlbGVjdG9yOlxuICAgICAgdHlwZTogU3RyaW5nXG4gICAgICB2YWx1ZTogJ2lubGluZS1ub2RlLCBpbmxpbmUtcGllY2UnXG5cbiAgY3JlYXRlZDogKCkgLT5cbiAgICBXYWl0Rm9yQ2hpbGRyZW4gdGhpc1xuXG4gIHJlYWR5OiAoKSAtPlxuICAgIEBjaGlsZHJlblJlYWR5ICgpID0+XG4gICAgICBAX3BvcHVsYXRlTGluZXMoKVxuICAgICAgQGZpcmVSZWFkeSgpXG5cbiAgIyMjXG4gIFJldHVybiA6Oj0gTGluZVxuICBDb250ZXh0IDo6PSBBcnJheTxMaW5lPlxuICBMaW5lIDo6PVxuICAgIHBpZWNlczogQXJyYXk8aW5saW5lLXBpZWNlIHwgQ29udGV4dD5cbiAgICB0YWJzdG9wczogTnVtYmVyXG4gICMjI1xuICBnZXRMaW5lOiAoKSAtPlxuICAgIGlmIEBfbGluZT9cbiAgICB0aGVuIEBfbGluZVxuICAgIGVsc2VcbiAgICAgIEBfcG9wdWxhdGVMaW5lcygpXG4gICAgICByZXR1cm4gQF9saW5lXG5cbiAgX3BvcHVsYXRlTGluZXM6ICgpIC0+XG4gICAgY29sbGVjdExpbmVzID0gKGxpbmUsIGNoaWxkKSAtPlxuICAgICAgc3dpdGNoIGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgICAjIHdoZW4gJ2lubGluZS10YWJzdG9wJ1xuICAgICAgICAjICAgbGluZS50YWJzdG9wcysrXG4gICAgICAgICMgICByZXR1cm4gbGluZVxuICAgICAgICB3aGVuICdpbmxpbmUtcGllY2UnXG4gICAgICAgICAgbGluZS5waWVjZXMucHVzaFxuICAgICAgICAgICAgdHlwZTogJ3BpZWNlJ1xuICAgICAgICAgICAgcGllY2U6IGNoaWxkXG4gICAgICAgICAgcmV0dXJuIGxpbmVcbiAgICAgICAgd2hlbiAnaW5saW5lLW5vZGUnXG4gICAgICAgICAgbGluZS5waWVjZXMucHVzaFxuICAgICAgICAgICAgdHlwZTogJ2NvbnRleHQnXG4gICAgICAgICAgICBsaW5lczogY2hpbGQuZ2V0TGluZXMoKVxuICAgICAgICAgICAgbm9kZTogY2hpbGRcbiAgICAgICAgICByZXR1cm4gbGluZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgY29uc29sZS5lcnJvciAnTm8gY2FzZSBmb3IgJywgY2hpbGRcblxuICAgIGluZGVudExldmVsID0gQGluZGVudFxuICAgIEBfbGluZSA9IEBnZXRDb250ZW50Q2hpbGRyZW4oKVxuICAgICAgLnJlZHVjZSBjb2xsZWN0TGluZXMsIHt0eXBlOiAnbGluZScsIHBpZWNlczogW10sIHRhYnN0b3BzOiBpbmRlbnRMZXZlbH0iLCJcbiMjI1xuTWl4aW4gdG8gaGF2ZSBhbiBlbGVtZW50IGNhbGwgYSBjYWxsYmFjayBvbmNlIGFsbCBkaXN0cmlidXRlZCBjaGlsZHJlbiBoYXZlXG4gIHNpZ25hbGxlZCByZWFkeS5cbiMjI1xuV2FpdEZvckNoaWxkcmVuID0gKG9iaiwgZXZlbnROYW1lID0gJ2NoaWxkLXJlYWR5JykgLT5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9iaiwgJ2NoaWxkcmVuUmVhZHknLFxuICAgIHZhbHVlOiAoY2FsbGJhY2spIC0+XG4gICAgICByZWNlaXZlZENvdW50ID0gMFxuICAgICAgb25DaGlsZHJlblJlYWR5ID0gKGV2dCkgPT5cbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAgICAgICBpZiByZWNlaXZlZENvdW50IGlzIEBnZXRDb250ZW50Q2hpbGRyZW4oKS5sZW5ndGhcbiAgICAgICAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuICAgICAgICAgIGRvIGNhbGxiYWNrXG4gICAgICBAYWRkRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuXG4gICMgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9iaiwgJ2J1YmJsZUNoaWxkcmVuUmVhZHknLFxuICAjICAgdmFsdWU6ICgpIC0+XG4gICMgICAgIHJlY2VpdmVkQ291bnQgPSAwXG4gICMgICAgIG9uQ2hpbGRyZW5SZWFkeSA9ICgpID0+XG4gICMgICAgICAgcmVjZWl2ZWRDb3VudCsrXG4gICMgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICMgICAgICAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuICAjICAgICAgICAgZG8gQGZpcmVSZWFkeVxuICAjICAgICBAYWRkRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdmaXJlUmVhZHknLFxuICAgIHZhbHVlOiAoKSAtPiBAZmlyZSBldmVudE5hbWVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhaXRGb3JDaGlsZHJlbiJdfQ==
