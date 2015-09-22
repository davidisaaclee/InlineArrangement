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
          throw new Error('No case for ' + child.tagName());
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZUxpbmUuY29mZmVlIiwiL1VzZXJzL2RhdmlkL0RvY3VtZW50cy9Xb3JrL0lubGluZUFycmFuZ2VtZW50L3NyYy9XYWl0Rm9yQ2hpbGRyZW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxpQkFBUjs7QUFFbEIsT0FBQSxDQUNFO0VBQUEsRUFBQSxFQUFJLGFBQUo7RUFFQSxVQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLEtBQUEsRUFBTyxDQURQO0tBREY7SUFHQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLE1BQU47TUFDQSxLQUFBLEVBQU8sMkJBRFA7S0FKRjtHQUhGO0VBVUEsT0FBQSxFQUFTLFNBQUE7V0FDUCxlQUFBLENBQWdCLElBQWhCO0VBRE8sQ0FWVDtFQWFBLEtBQUEsRUFBTyxTQUFBO1dBQ0wsSUFBQyxDQUFBLGFBQUQsQ0FBZSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDYixLQUFDLENBQUEsY0FBRCxDQUFBO2VBQ0EsS0FBQyxDQUFBLFNBQUQsQ0FBQTtNQUZhO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmO0VBREssQ0FiUDs7QUFrQkE7Ozs7Ozs7RUFPQSxPQUFBLEVBQVMsU0FBQTtJQUNQLElBQUcsa0JBQUg7YUFDSyxJQUFDLENBQUEsTUFETjtLQUFBLE1BQUE7TUFHRSxJQUFDLENBQUEsY0FBRCxDQUFBO0FBQ0EsYUFBTyxJQUFDLENBQUEsTUFKVjs7RUFETyxDQXpCVDtFQWdDQSxjQUFBLEVBQWdCLFNBQUE7QUFDZCxRQUFBO0lBQUEsWUFBQSxHQUFlLFNBQUMsSUFBRCxFQUFPLEtBQVA7QUFDYixjQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBZCxDQUFBLENBQVA7QUFBQSxhQUlPLGNBSlA7VUFLSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQVosQ0FDRTtZQUFBLElBQUEsRUFBTSxPQUFOO1lBQ0EsS0FBQSxFQUFPLEtBRFA7V0FERjtBQUdBLGlCQUFPO0FBUlgsYUFTTyxhQVRQO1VBVUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFaLENBQ0U7WUFBQSxJQUFBLEVBQU0sU0FBTjtZQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsUUFBTixDQUFBLENBRFA7WUFFQSxJQUFBLEVBQU0sS0FGTjtXQURGO0FBSUEsaUJBQU87QUFkWDtBQWdCSSxnQkFBVSxJQUFBLEtBQUEsQ0FBTSxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQUEsQ0FBdkI7QUFoQmQ7SUFEYTtJQW1CZixXQUFBLEdBQWMsSUFBQyxDQUFBO1dBQ2YsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsa0JBQUQsQ0FBQSxDQUNQLENBQUMsTUFETSxDQUNDLFlBREQsRUFDZTtNQUFDLElBQUEsRUFBTSxNQUFQO01BQWUsTUFBQSxFQUFRLEVBQXZCO01BQTJCLFFBQUEsRUFBVSxXQUFyQztLQURmO0VBckJLLENBaENoQjtDQURGOzs7OztBQ0RBOzs7O0FBQUEsSUFBQTs7QUFJQSxlQUFBLEdBQWtCLFNBQUMsR0FBRCxFQUFNLFNBQU47O0lBQU0sWUFBWTs7RUFDbEMsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsZUFBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFDLFFBQUQ7QUFDTCxVQUFBO01BQUEsYUFBQSxHQUFnQjtNQUNoQixlQUFBLEdBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFEO1VBQ2hCLEdBQUcsQ0FBQyxlQUFKLENBQUE7VUFDQSxhQUFBO1VBQ0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxrQkFBRCxDQUFBLENBQXFCLENBQUMsTUFBMUM7WUFDRSxLQUFDLENBQUEsbUJBQUQsQ0FBcUIsU0FBckIsRUFBZ0MsZUFBaEM7bUJBQ0csUUFBSCxDQUFBLEVBRkY7O1FBSGdCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTthQU1sQixJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsU0FBbEIsRUFBNkIsZUFBN0I7SUFSSyxDQUFQO0dBREY7U0FxQkEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsV0FBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFBO2FBQU0sSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOO0lBQU4sQ0FBUDtHQURGO0FBdEJnQjs7QUEwQmxCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIldhaXRGb3JDaGlsZHJlbiA9IHJlcXVpcmUgJ1dhaXRGb3JDaGlsZHJlbidcblxuUG9seW1lclxuICBpczogJ2lubGluZS1saW5lJ1xuXG4gIHByb3BlcnRpZXM6XG4gICAgaW5kZW50OlxuICAgICAgdHlwZTogTnVtYmVyXG4gICAgICB2YWx1ZTogMFxuICAgIGNoaWxkcmVuU2VsZWN0b3I6XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICAgIHZhbHVlOiAnaW5saW5lLW5vZGUsIGlubGluZS1waWVjZSdcblxuICBjcmVhdGVkOiAoKSAtPlxuICAgIFdhaXRGb3JDaGlsZHJlbiB0aGlzXG5cbiAgcmVhZHk6ICgpIC0+XG4gICAgQGNoaWxkcmVuUmVhZHkgKCkgPT5cbiAgICAgIEBfcG9wdWxhdGVMaW5lcygpXG4gICAgICBAZmlyZVJlYWR5KClcblxuICAjIyNcbiAgUmV0dXJuIDo6PSBMaW5lXG4gIENvbnRleHQgOjo9IEFycmF5PExpbmU+XG4gIExpbmUgOjo9XG4gICAgcGllY2VzOiBBcnJheTxpbmxpbmUtcGllY2UgfCBDb250ZXh0PlxuICAgIHRhYnN0b3BzOiBOdW1iZXJcbiAgIyMjXG4gIGdldExpbmU6ICgpIC0+XG4gICAgaWYgQF9saW5lP1xuICAgIHRoZW4gQF9saW5lXG4gICAgZWxzZVxuICAgICAgQF9wb3B1bGF0ZUxpbmVzKClcbiAgICAgIHJldHVybiBAX2xpbmVcblxuICBfcG9wdWxhdGVMaW5lczogKCkgLT5cbiAgICBjb2xsZWN0TGluZXMgPSAobGluZSwgY2hpbGQpIC0+XG4gICAgICBzd2l0Y2ggY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICMgd2hlbiAnaW5saW5lLXRhYnN0b3AnXG4gICAgICAgICMgICBsaW5lLnRhYnN0b3BzKytcbiAgICAgICAgIyAgIHJldHVybiBsaW5lXG4gICAgICAgIHdoZW4gJ2lubGluZS1waWVjZSdcbiAgICAgICAgICBsaW5lLnBpZWNlcy5wdXNoXG4gICAgICAgICAgICB0eXBlOiAncGllY2UnXG4gICAgICAgICAgICBwaWVjZTogY2hpbGRcbiAgICAgICAgICByZXR1cm4gbGluZVxuICAgICAgICB3aGVuICdpbmxpbmUtbm9kZSdcbiAgICAgICAgICBsaW5lLnBpZWNlcy5wdXNoXG4gICAgICAgICAgICB0eXBlOiAnY29udGV4dCdcbiAgICAgICAgICAgIGxpbmVzOiBjaGlsZC5nZXRMaW5lcygpXG4gICAgICAgICAgICBub2RlOiBjaGlsZFxuICAgICAgICAgIHJldHVybiBsaW5lXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IgJ05vIGNhc2UgZm9yICcgKyBjaGlsZC50YWdOYW1lKClcblxuICAgIGluZGVudExldmVsID0gQGluZGVudFxuICAgIEBfbGluZSA9IEBnZXRDb250ZW50Q2hpbGRyZW4oKVxuICAgICAgLnJlZHVjZSBjb2xsZWN0TGluZXMsIHt0eXBlOiAnbGluZScsIHBpZWNlczogW10sIHRhYnN0b3BzOiBpbmRlbnRMZXZlbH0iLCJcbiMjI1xuTWl4aW4gdG8gaGF2ZSBhbiBlbGVtZW50IGNhbGwgYSBjYWxsYmFjayBvbmNlIGFsbCBkaXN0cmlidXRlZCBjaGlsZHJlbiBoYXZlXG4gIHNpZ25hbGxlZCByZWFkeS5cbiMjI1xuV2FpdEZvckNoaWxkcmVuID0gKG9iaiwgZXZlbnROYW1lID0gJ2NoaWxkLXJlYWR5JykgLT5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9iaiwgJ2NoaWxkcmVuUmVhZHknLFxuICAgIHZhbHVlOiAoY2FsbGJhY2spIC0+XG4gICAgICByZWNlaXZlZENvdW50ID0gMFxuICAgICAgb25DaGlsZHJlblJlYWR5ID0gKGV2dCkgPT5cbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAgICAgICBpZiByZWNlaXZlZENvdW50IGlzIEBnZXRDb250ZW50Q2hpbGRyZW4oKS5sZW5ndGhcbiAgICAgICAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuICAgICAgICAgIGRvIGNhbGxiYWNrXG4gICAgICBAYWRkRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuXG4gICMgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9iaiwgJ2J1YmJsZUNoaWxkcmVuUmVhZHknLFxuICAjICAgdmFsdWU6ICgpIC0+XG4gICMgICAgIHJlY2VpdmVkQ291bnQgPSAwXG4gICMgICAgIG9uQ2hpbGRyZW5SZWFkeSA9ICgpID0+XG4gICMgICAgICAgcmVjZWl2ZWRDb3VudCsrXG4gICMgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICMgICAgICAgICBAcmVtb3ZlRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuICAjICAgICAgICAgZG8gQGZpcmVSZWFkeVxuICAjICAgICBAYWRkRXZlbnRMaXN0ZW5lciBldmVudE5hbWUsIG9uQ2hpbGRyZW5SZWFkeVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdmaXJlUmVhZHknLFxuICAgIHZhbHVlOiAoKSAtPiBAZmlyZSBldmVudE5hbWVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhaXRGb3JDaGlsZHJlbiJdfQ==
