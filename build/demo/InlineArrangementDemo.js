(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modelObject, root, startLine, transformModel;

modelObject = {
  type: 'hole',
  expression: {
    type: 'expression',
    instances: [
      {
        type: 'instance',
        children: [
          {
            type: 'literal',
            text: 'function foo ('
          }, {
            type: 'hole',
            expression: {
              type: 'expression',
              instances: [
                {
                  type: 'instance',
                  children: [
                    {
                      type: 'literal',
                      text: "I'm inside here! \nand have multiple lines"
                    }
                  ]
                }
              ]
            }
          }, {
            type: 'literal',
            text: ') {\n\t'
          }, {
            type: 'hole',
            expression: {
              type: 'expression',
              instances: [
                {
                  type: 'instance',
                  children: [
                    {
                      type: 'literal',
                      text: "I'm inside here! \n\tand have multiple lines"
                    }
                  ]
                }
              ]
            }
          }, {
            type: 'literal',
            text: '\n}'
          }
        ]
      }
    ]
  }
};

root = document.querySelector('#root');

transformModel = function(model, context, currentLine) {
  var ctx, firstLine, lineElm, ln;
  switch (model.type) {
    case 'expression':
      ln = currentLine;
      model.instances.forEach(function(inst) {
        var ref;
        return ref = transformModel(inst, context, ln), ln = ref.ln, ref;
      });
      return {
        ctx: context,
        ln: currentLine
      };
    case 'instance':
      ctx = document.createElement('inline-node');
      firstLine = document.createElement('inline-line');
      Polymer.dom(ctx).appendChild(firstLine);
      Polymer.dom(currentLine).appendChild(ctx);
      ln = firstLine;
      model.children.forEach(function(child) {
        var ref;
        return ref = transformModel(child, ctx, ln), ln = ref.ln, ctx = ref.ctx, ref;
      });
      return {
        ctx: context,
        ln: currentLine
      };
    case 'hole':
      if (model.expression != null) {
        return transformModel(model.expression, context, currentLine);
      } else {
        return {
          ctx: context,
          ln: currentLine
        };
      }
      break;
    case 'literal':
      lineElm = currentLine;
      (model.text.split('\n')).forEach(function(line, idx) {
        var pc, text;
        if (idx !== 0) {
          lineElm = document.createElement('inline-line');
          Polymer.dom(context).appendChild(lineElm);
        }
        if ((line.charAt(0)) === '\t') {
          lineElm.indent++;
        }
        pc = document.createElement('inline-piece');
        text = document.createElement('span');
        text.innerText = line;
        Polymer.dom(pc).appendChild(text);
        return Polymer.dom(lineElm).appendChild(pc);
      });
      return {
        ctx: context,
        ln: lineElm
      };
  }
};

startLine = document.createElement('inline-line');

Polymer.dom(root).appendChild(startLine);

transformModel(modelObject, root, startLine);

setTimeout((function() {
  return root.update();
}), 1000);


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL2RlbW8vSW5saW5lQXJyYW5nZW1lbnREZW1vLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsV0FBQSxHQUNFO0VBQUEsSUFBQSxFQUFNLE1BQU47RUFDQSxVQUFBLEVBQ0U7SUFBQSxJQUFBLEVBQU0sWUFBTjtJQUNBLFNBQUEsRUFBVztNQUNUO1FBQUEsSUFBQSxFQUFNLFVBQU47UUFDQSxRQUFBLEVBQVU7VUFDUjtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsSUFBQSxFQUFNLGdCQUROO1dBRFEsRUFJUjtZQUFBLElBQUEsRUFBTSxNQUFOO1lBQ0EsVUFBQSxFQUNFO2NBQUEsSUFBQSxFQUFNLFlBQU47Y0FDQSxTQUFBLEVBQVc7Z0JBQ1Q7a0JBQUEsSUFBQSxFQUFNLFVBQU47a0JBQ0EsUUFBQSxFQUFVO29CQUNSO3NCQUFBLElBQUEsRUFBTSxTQUFOO3NCQUNBLElBQUEsRUFBTSw0Q0FETjtxQkFEUTttQkFEVjtpQkFEUztlQURYO2FBRkY7V0FKUSxFQWVSO1lBQUEsSUFBQSxFQUFNLFNBQU47WUFDQSxJQUFBLEVBQU0sU0FETjtXQWZRLEVBa0JSO1lBQUEsSUFBQSxFQUFNLE1BQU47WUFDQSxVQUFBLEVBQ0U7Y0FBQSxJQUFBLEVBQU0sWUFBTjtjQUNBLFNBQUEsRUFBVztnQkFDVDtrQkFBQSxJQUFBLEVBQU0sVUFBTjtrQkFDQSxRQUFBLEVBQVU7b0JBQ1I7c0JBQUEsSUFBQSxFQUFNLFNBQU47c0JBQ0EsSUFBQSxFQUFNLDhDQUROO3FCQURRO21CQURWO2lCQURTO2VBRFg7YUFGRjtXQWxCUSxFQTZCUjtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsSUFBQSxFQUFNLEtBRE47V0E3QlE7U0FE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QUFFQSxVQUFBLENBQVcsQ0FBQyxTQUFBO1NBQU0sSUFBSSxDQUFDLE1BQUwsQ0FBQTtBQUFOLENBQUQsQ0FBWCxFQUFrQyxJQUFsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2RlbE9iamVjdCA9XG4gIHR5cGU6ICdob2xlJ1xuICBleHByZXNzaW9uOlxuICAgIHR5cGU6ICdleHByZXNzaW9uJ1xuICAgIGluc3RhbmNlczogW1xuICAgICAgdHlwZTogJ2luc3RhbmNlJ1xuICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgdHlwZTogJ2xpdGVyYWwnXG4gICAgICAgIHRleHQ6ICdmdW5jdGlvbiBmb28gKCdcbiAgICAgICAsXG4gICAgICAgIHR5cGU6ICdob2xlJ1xuICAgICAgICBleHByZXNzaW9uOlxuICAgICAgICAgIHR5cGU6ICdleHByZXNzaW9uJ1xuICAgICAgICAgIGluc3RhbmNlczogW1xuICAgICAgICAgICAgdHlwZTogJ2luc3RhbmNlJ1xuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgdHlwZTogJ2xpdGVyYWwnXG4gICAgICAgICAgICAgIHRleHQ6IFwiSSdtIGluc2lkZSBoZXJlISBcXG5hbmQgaGF2ZSBtdWx0aXBsZSBsaW5lc1wiXG4gICAgICAgICAgICBdXG4gICAgICAgICAgXVxuICAgICAgICxcbiAgICAgICAgdHlwZTogJ2xpdGVyYWwnXG4gICAgICAgIHRleHQ6ICcpIHtcXG5cXHQnXG4gICAgICAgLFxuICAgICAgICB0eXBlOiAnaG9sZSdcbiAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICB0eXBlOiAnZXhwcmVzc2lvbidcbiAgICAgICAgICBpbnN0YW5jZXM6IFtcbiAgICAgICAgICAgIHR5cGU6ICdpbnN0YW5jZSdcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgIHR5cGU6ICdsaXRlcmFsJ1xuICAgICAgICAgICAgICB0ZXh0OiBcIkknbSBpbnNpZGUgaGVyZSEgXFxuXFx0YW5kIGhhdmUgbXVsdGlwbGUgbGluZXNcIlxuICAgICAgICAgICAgXVxuICAgICAgICAgIF1cbiAgICAgICAsXG4gICAgICAgIHR5cGU6ICdsaXRlcmFsJ1xuICAgICAgICB0ZXh0OiAnXFxufSdcbiAgICAgIF1cbiAgICBdXG5cblxuXG5yb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAnI3Jvb3QnXG5cbnRyYW5zZm9ybU1vZGVsID0gKG1vZGVsLCBjb250ZXh0LCBjdXJyZW50TGluZSkgLT5cbiAgc3dpdGNoIG1vZGVsLnR5cGVcbiAgICB3aGVuICdleHByZXNzaW9uJ1xuICAgICAgbG4gPSBjdXJyZW50TGluZVxuICAgICAgbW9kZWwuaW5zdGFuY2VzLmZvckVhY2ggKGluc3QpIC0+XG4gICAgICAgIHtsbn0gPSB0cmFuc2Zvcm1Nb2RlbCBpbnN0LCBjb250ZXh0LCBsblxuXG4gICAgICByZXR1cm4ge2N0eDogY29udGV4dCwgbG46IGN1cnJlbnRMaW5lfVxuXG4gICAgd2hlbiAnaW5zdGFuY2UnXG4gICAgICBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbmxpbmUtbm9kZSdcbiAgICAgIGZpcnN0TGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lubGluZS1saW5lJ1xuICAgICAgUG9seW1lci5kb20oY3R4KS5hcHBlbmRDaGlsZCBmaXJzdExpbmVcblxuICAgICAgUG9seW1lci5kb20oY3VycmVudExpbmUpLmFwcGVuZENoaWxkIGN0eFxuICAgICAgbG4gPSBmaXJzdExpbmVcbiAgICAgIG1vZGVsLmNoaWxkcmVuLmZvckVhY2ggKGNoaWxkKSAtPlxuICAgICAgICB7bG4sIGN0eH0gPSB0cmFuc2Zvcm1Nb2RlbCBjaGlsZCwgY3R4LCBsblxuXG4gICAgICByZXR1cm4ge2N0eDogY29udGV4dCwgbG46IGN1cnJlbnRMaW5lfVxuXG4gICAgd2hlbiAnaG9sZSdcbiAgICAgIGlmIG1vZGVsLmV4cHJlc3Npb24/XG4gICAgICB0aGVuIHJldHVybiB0cmFuc2Zvcm1Nb2RlbCBtb2RlbC5leHByZXNzaW9uLCBjb250ZXh0LCBjdXJyZW50TGluZVxuICAgICAgZWxzZSByZXR1cm4ge2N0eDogY29udGV4dCwgbG46IGN1cnJlbnRMaW5lfVxuXG4gICAgd2hlbiAnbGl0ZXJhbCdcbiAgICAgIGxpbmVFbG0gPSBjdXJyZW50TGluZVxuICAgICAgKG1vZGVsLnRleHQuc3BsaXQgJ1xcbicpLmZvckVhY2ggKGxpbmUsIGlkeCkgLT5cbiAgICAgICAgaWYgaWR4IGlzbnQgMFxuICAgICAgICAgIGxpbmVFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbmxpbmUtbGluZSdcbiAgICAgICAgICBQb2x5bWVyLmRvbShjb250ZXh0KS5hcHBlbmRDaGlsZCBsaW5lRWxtXG5cbiAgICAgICAgaWYgKGxpbmUuY2hhckF0IDApIGlzICdcXHQnXG4gICAgICAgICAgbGluZUVsbS5pbmRlbnQrK1xuXG4gICAgICAgIHBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5saW5lLXBpZWNlJ1xuICAgICAgICB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc3BhbidcbiAgICAgICAgdGV4dC5pbm5lclRleHQgPSBsaW5lXG5cbiAgICAgICAgUG9seW1lci5kb20ocGMpLmFwcGVuZENoaWxkIHRleHRcbiAgICAgICAgUG9seW1lci5kb20obGluZUVsbSkuYXBwZW5kQ2hpbGQgcGNcblxuICAgICAgcmV0dXJuIHtjdHg6IGNvbnRleHQsIGxuOiBsaW5lRWxtfVxuXG5cbnN0YXJ0TGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lubGluZS1saW5lJ1xuUG9seW1lci5kb20ocm9vdCkuYXBwZW5kQ2hpbGQgc3RhcnRMaW5lXG50cmFuc2Zvcm1Nb2RlbCBtb2RlbE9iamVjdCwgcm9vdCwgc3RhcnRMaW5lXG5cbnNldFRpbWVvdXQgKCgpIC0+IHJvb3QudXBkYXRlKCkpLCAxMDAwIl19
