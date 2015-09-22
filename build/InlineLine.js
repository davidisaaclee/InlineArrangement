(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WaitForChildren;

WaitForChildren = require('WaitForChildren');

Polymer({
  is: 'inline-line',
  properties: {
    indent: {
      type: Number,
      value: 0
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
    return this._line;
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
          return console.log('No case for ', child);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0lubGluZUxpbmUuY29mZmVlIiwiL1VzZXJzL2RhdmlkL0RvY3VtZW50cy9Xb3JrL0lubGluZUFycmFuZ2VtZW50L3NyYy9XYWl0Rm9yQ2hpbGRyZW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxpQkFBUjs7QUFFbEIsT0FBQSxDQUNFO0VBQUEsRUFBQSxFQUFJLGFBQUo7RUFFQSxVQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUNBLEtBQUEsRUFBTyxDQURQO0tBREY7R0FIRjtFQU9BLE9BQUEsRUFBUyxTQUFBO1dBQ1AsZUFBQSxDQUFnQixJQUFoQjtFQURPLENBUFQ7RUFVQSxLQUFBLEVBQU8sU0FBQTtXQUNMLElBQUMsQ0FBQSxhQUFELENBQWUsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ2IsS0FBQyxDQUFBLGNBQUQsQ0FBQTtlQUNBLEtBQUMsQ0FBQSxTQUFELENBQUE7TUFGYTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZjtFQURLLENBVlA7O0FBZUE7Ozs7Ozs7RUFPQSxPQUFBLEVBQVMsU0FBQTtXQUFNLElBQUMsQ0FBQTtFQUFQLENBdEJUO0VBd0JBLGNBQUEsRUFBZ0IsU0FBQTtBQUNkLFFBQUE7SUFBQSxZQUFBLEdBQWUsU0FBQyxJQUFELEVBQU8sS0FBUDtBQUNiLGNBQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFkLENBQUEsQ0FBUDtBQUFBLGFBSU8sY0FKUDtVQUtJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBWixDQUNFO1lBQUEsSUFBQSxFQUFNLE9BQU47WUFDQSxLQUFBLEVBQU8sS0FEUDtXQURGO0FBR0EsaUJBQU87QUFSWCxhQVNPLGFBVFA7VUFVSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQVosQ0FDRTtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsS0FBQSxFQUFPLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FEUDtZQUVBLElBQUEsRUFBTSxLQUZOO1dBREY7QUFJQSxpQkFBTztBQWRYO2lCQWdCSSxPQUFPLENBQUMsR0FBUixDQUFZLGNBQVosRUFBNEIsS0FBNUI7QUFoQko7SUFEYTtJQW1CZixXQUFBLEdBQWMsSUFBQyxDQUFBO1dBQ2YsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsa0JBQUQsQ0FBQSxDQUNQLENBQUMsTUFETSxDQUNDLFlBREQsRUFDZTtNQUFDLElBQUEsRUFBTSxNQUFQO01BQWUsTUFBQSxFQUFRLEVBQXZCO01BQTJCLFFBQUEsRUFBVSxXQUFyQztLQURmO0VBckJLLENBeEJoQjtDQURGOzs7OztBQ0RBOzs7O0FBQUEsSUFBQTs7QUFJQSxlQUFBLEdBQWtCLFNBQUMsR0FBRCxFQUFNLFNBQU47O0lBQU0sWUFBWTs7RUFDbEMsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsZUFBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFDLFFBQUQ7QUFDTCxVQUFBO01BQUEsYUFBQSxHQUFnQjtNQUNoQixlQUFBLEdBQWtCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxHQUFEO1VBQ2hCLEdBQUcsQ0FBQyxlQUFKLENBQUE7VUFDQSxhQUFBO1VBQ0EsSUFBRyxhQUFBLEtBQWlCLEtBQUMsQ0FBQSxrQkFBRCxDQUFBLENBQXFCLENBQUMsTUFBMUM7WUFDRSxLQUFDLENBQUEsbUJBQUQsQ0FBcUIsU0FBckIsRUFBZ0MsZUFBaEM7bUJBQ0csUUFBSCxDQUFBLEVBRkY7O1FBSGdCO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTthQU1sQixJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsU0FBbEIsRUFBNkIsZUFBN0I7SUFSSyxDQUFQO0dBREY7U0FxQkEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsR0FBdEIsRUFBMkIsV0FBM0IsRUFDRTtJQUFBLEtBQUEsRUFBTyxTQUFBO2FBQU0sSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOO0lBQU4sQ0FBUDtHQURGO0FBdEJnQjs7QUEwQmxCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIldhaXRGb3JDaGlsZHJlbiA9IHJlcXVpcmUgJ1dhaXRGb3JDaGlsZHJlbidcblxuUG9seW1lclxuICBpczogJ2lubGluZS1saW5lJ1xuXG4gIHByb3BlcnRpZXM6XG4gICAgaW5kZW50OlxuICAgICAgdHlwZTogTnVtYmVyXG4gICAgICB2YWx1ZTogMFxuXG4gIGNyZWF0ZWQ6ICgpIC0+XG4gICAgV2FpdEZvckNoaWxkcmVuIHRoaXNcblxuICByZWFkeTogKCkgLT5cbiAgICBAY2hpbGRyZW5SZWFkeSAoKSA9PlxuICAgICAgQF9wb3B1bGF0ZUxpbmVzKClcbiAgICAgIEBmaXJlUmVhZHkoKVxuXG4gICMjI1xuICBSZXR1cm4gOjo9IExpbmVcbiAgQ29udGV4dCA6Oj0gQXJyYXk8TGluZT5cbiAgTGluZSA6Oj1cbiAgICBwaWVjZXM6IEFycmF5PGlubGluZS1waWVjZSB8IENvbnRleHQ+XG4gICAgdGFic3RvcHM6IE51bWJlclxuICAjIyNcbiAgZ2V0TGluZTogKCkgLT4gQF9saW5lXG5cbiAgX3BvcHVsYXRlTGluZXM6ICgpIC0+XG4gICAgY29sbGVjdExpbmVzID0gKGxpbmUsIGNoaWxkKSAtPlxuICAgICAgc3dpdGNoIGNoaWxkLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgICAjIHdoZW4gJ2lubGluZS10YWJzdG9wJ1xuICAgICAgICAjICAgbGluZS50YWJzdG9wcysrXG4gICAgICAgICMgICByZXR1cm4gbGluZVxuICAgICAgICB3aGVuICdpbmxpbmUtcGllY2UnXG4gICAgICAgICAgbGluZS5waWVjZXMucHVzaFxuICAgICAgICAgICAgdHlwZTogJ3BpZWNlJ1xuICAgICAgICAgICAgcGllY2U6IGNoaWxkXG4gICAgICAgICAgcmV0dXJuIGxpbmVcbiAgICAgICAgd2hlbiAnaW5saW5lLW5vZGUnXG4gICAgICAgICAgbGluZS5waWVjZXMucHVzaFxuICAgICAgICAgICAgdHlwZTogJ2NvbnRleHQnXG4gICAgICAgICAgICBsaW5lczogY2hpbGQuZ2V0TGluZXMoKVxuICAgICAgICAgICAgbm9kZTogY2hpbGRcbiAgICAgICAgICByZXR1cm4gbGluZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgY29uc29sZS5sb2cgJ05vIGNhc2UgZm9yICcsIGNoaWxkXG5cbiAgICBpbmRlbnRMZXZlbCA9IEBpbmRlbnRcbiAgICBAX2xpbmUgPSBAZ2V0Q29udGVudENoaWxkcmVuKClcbiAgICAgIC5yZWR1Y2UgY29sbGVjdExpbmVzLCB7dHlwZTogJ2xpbmUnLCBwaWVjZXM6IFtdLCB0YWJzdG9wczogaW5kZW50TGV2ZWx9IiwiXG4jIyNcbk1peGluIHRvIGhhdmUgYW4gZWxlbWVudCBjYWxsIGEgY2FsbGJhY2sgb25jZSBhbGwgZGlzdHJpYnV0ZWQgY2hpbGRyZW4gaGF2ZVxuICBzaWduYWxsZWQgcmVhZHkuXG4jIyNcbldhaXRGb3JDaGlsZHJlbiA9IChvYmosIGV2ZW50TmFtZSA9ICdjaGlsZC1yZWFkeScpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdjaGlsZHJlblJlYWR5JyxcbiAgICB2YWx1ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgcmVjZWl2ZWRDb3VudCA9IDBcbiAgICAgIG9uQ2hpbGRyZW5SZWFkeSA9IChldnQpID0+XG4gICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZWNlaXZlZENvdW50KytcbiAgICAgICAgaWYgcmVjZWl2ZWRDb3VudCBpcyBAZ2V0Q29udGVudENoaWxkcmVuKCkubGVuZ3RoXG4gICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgICAgICAgICBkbyBjYWxsYmFja1xuICAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICAjIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvYmosICdidWJibGVDaGlsZHJlblJlYWR5JyxcbiAgIyAgIHZhbHVlOiAoKSAtPlxuICAjICAgICByZWNlaXZlZENvdW50ID0gMFxuICAjICAgICBvbkNoaWxkcmVuUmVhZHkgPSAoKSA9PlxuICAjICAgICAgIHJlY2VpdmVkQ291bnQrK1xuICAjICAgICAgIGlmIHJlY2VpdmVkQ291bnQgaXMgQGdldENvbnRlbnRDaGlsZHJlbigpLmxlbmd0aFxuICAjICAgICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcbiAgIyAgICAgICAgIGRvIEBmaXJlUmVhZHlcbiAgIyAgICAgQGFkZEV2ZW50TGlzdGVuZXIgZXZlbnROYW1lLCBvbkNoaWxkcmVuUmVhZHlcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgb2JqLCAnZmlyZVJlYWR5JyxcbiAgICB2YWx1ZTogKCkgLT4gQGZpcmUgZXZlbnROYW1lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBXYWl0Rm9yQ2hpbGRyZW4iXX0=
