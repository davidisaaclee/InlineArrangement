(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ChainableElement;

ChainableElement = Polymer({
  is: 'chainable-element',
  created: function() {

    /*
    @property [{left: Number, top: Number}] insertionPoint The origin for the next
      element in the chain.
     */
    return Object.defineProperty(this, 'insertionPoint', {
      get: function() {}
    });

    /*
    @property [Number] width The width of the widest child of this element.
     */

    /*
    @property [Number] height The combined height of this element's children.
     */
  },
  attached: function() {}
});


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL0NoYWluYWJsZUVsZW1lbnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxnQkFBQSxHQUFtQixPQUFBLENBQ2pCO0VBQUEsRUFBQSxFQUFJLG1CQUFKO0VBRUEsT0FBQSxFQUFTLFNBQUE7O0FBQ1A7Ozs7V0FJQSxNQUFNLENBQUMsY0FBUCxDQUFzQixJQUF0QixFQUE0QixnQkFBNUIsRUFDRTtNQUFBLEdBQUEsRUFBSyxTQUFBLEdBQUEsQ0FBTDtLQURGOztBQUlBOzs7O0FBSUE7OztFQWJPLENBRlQ7RUFtQkEsUUFBQSxFQUFVLFNBQUEsR0FBQSxDQW5CVjtDQURpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJDaGFpbmFibGVFbGVtZW50ID0gUG9seW1lclxuICBpczogJ2NoYWluYWJsZS1lbGVtZW50J1xuXG4gIGNyZWF0ZWQ6ICgpIC0+XG4gICAgIyMjXG4gICAgQHByb3BlcnR5IFt7bGVmdDogTnVtYmVyLCB0b3A6IE51bWJlcn1dIGluc2VydGlvblBvaW50IFRoZSBvcmlnaW4gZm9yIHRoZSBuZXh0XG4gICAgICBlbGVtZW50IGluIHRoZSBjaGFpbi5cbiAgICAjIyNcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhpcywgJ2luc2VydGlvblBvaW50JyxcbiAgICAgIGdldDogKCkgLT5cbiAgICAgICAgXG5cbiAgICAjIyNcbiAgICBAcHJvcGVydHkgW051bWJlcl0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3aWRlc3QgY2hpbGQgb2YgdGhpcyBlbGVtZW50LlxuICAgICMjI1xuXG4gICAgIyMjXG4gICAgQHByb3BlcnR5IFtOdW1iZXJdIGhlaWdodCBUaGUgY29tYmluZWQgaGVpZ2h0IG9mIHRoaXMgZWxlbWVudCdzIGNoaWxkcmVuLlxuICAgICMjI1xuXG4gIGF0dGFjaGVkOiAoKSAtPlxuIl19
