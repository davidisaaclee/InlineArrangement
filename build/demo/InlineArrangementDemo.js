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
  return root.updateChildren();
}), 1000);


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL2RlbW8vSW5saW5lQXJyYW5nZW1lbnREZW1vLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsV0FBQSxHQUNFO0VBQUEsSUFBQSxFQUFNLE1BQU47RUFDQSxVQUFBLEVBQ0U7SUFBQSxJQUFBLEVBQU0sWUFBTjtJQUNBLFNBQUEsRUFBVztNQUNUO1FBQUEsSUFBQSxFQUFNLFVBQU47UUFDQSxRQUFBLEVBQVU7VUFDUjtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsSUFBQSxFQUFNLGdCQUROO1dBRFEsRUFJUjtZQUFBLElBQUEsRUFBTSxNQUFOO1lBQ0EsVUFBQSxFQUNFO2NBQUEsSUFBQSxFQUFNLFlBQU47Y0FDQSxTQUFBLEVBQVc7Z0JBQ1Q7a0JBQUEsSUFBQSxFQUFNLFVBQU47a0JBQ0EsUUFBQSxFQUFVO29CQUNSO3NCQUFBLElBQUEsRUFBTSxTQUFOO3NCQUNBLElBQUEsRUFBTSw0Q0FETjtxQkFEUTttQkFEVjtpQkFEUztlQURYO2FBRkY7V0FKUSxFQWVSO1lBQUEsSUFBQSxFQUFNLFNBQU47WUFDQSxJQUFBLEVBQU0sU0FETjtXQWZRLEVBa0JSO1lBQUEsSUFBQSxFQUFNLE1BQU47WUFDQSxVQUFBLEVBQ0U7Y0FBQSxJQUFBLEVBQU0sWUFBTjtjQUNBLFNBQUEsRUFBVztnQkFDVDtrQkFBQSxJQUFBLEVBQU0sVUFBTjtrQkFDQSxRQUFBLEVBQVU7b0JBQ1I7c0JBQUEsSUFBQSxFQUFNLFNBQU47c0JBQ0EsSUFBQSxFQUFNLDhDQUROO3FCQURRO21CQURWO2lCQURTO2VBRFg7YUFGRjtXQWxCUSxFQTZCUjtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsSUFBQSxFQUFNLEtBRE47V0E3QlE7U0FE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O0FBRUEsVUFBQSxDQUFXLENBQUMsU0FBQTtTQUFNLElBQUksQ0FBQyxjQUFMLENBQUE7QUFBTixDQUFELENBQVgsRUFBMEMsSUFBMUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kZWxPYmplY3QgPVxuICB0eXBlOiAnaG9sZSdcbiAgZXhwcmVzc2lvbjpcbiAgICB0eXBlOiAnZXhwcmVzc2lvbidcbiAgICBpbnN0YW5jZXM6IFtcbiAgICAgIHR5cGU6ICdpbnN0YW5jZSdcbiAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgIHR5cGU6ICdsaXRlcmFsJ1xuICAgICAgICB0ZXh0OiAnZnVuY3Rpb24gZm9vICgnXG4gICAgICAgLFxuICAgICAgICB0eXBlOiAnaG9sZSdcbiAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICB0eXBlOiAnZXhwcmVzc2lvbidcbiAgICAgICAgICBpbnN0YW5jZXM6IFtcbiAgICAgICAgICAgIHR5cGU6ICdpbnN0YW5jZSdcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgIHR5cGU6ICdsaXRlcmFsJ1xuICAgICAgICAgICAgICB0ZXh0OiBcIkknbSBpbnNpZGUgaGVyZSEgXFxuYW5kIGhhdmUgbXVsdGlwbGUgbGluZXNcIlxuICAgICAgICAgICAgXVxuICAgICAgICAgIF1cbiAgICAgICAsXG4gICAgICAgIHR5cGU6ICdsaXRlcmFsJ1xuICAgICAgICB0ZXh0OiAnKSB7XFxuXFx0J1xuICAgICAgICxcbiAgICAgICAgdHlwZTogJ2hvbGUnXG4gICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgdHlwZTogJ2V4cHJlc3Npb24nXG4gICAgICAgICAgaW5zdGFuY2VzOiBbXG4gICAgICAgICAgICB0eXBlOiAnaW5zdGFuY2UnXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICB0eXBlOiAnbGl0ZXJhbCdcbiAgICAgICAgICAgICAgdGV4dDogXCJJJ20gaW5zaWRlIGhlcmUhIFxcblxcdGFuZCBoYXZlIG11bHRpcGxlIGxpbmVzXCJcbiAgICAgICAgICAgIF1cbiAgICAgICAgICBdXG4gICAgICAgLFxuICAgICAgICB0eXBlOiAnbGl0ZXJhbCdcbiAgICAgICAgdGV4dDogJ1xcbn0nXG4gICAgICBdXG4gICAgXVxuXG5cblxucm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJyNyb290J1xuXG50cmFuc2Zvcm1Nb2RlbCA9IChtb2RlbCwgY29udGV4dCwgY3VycmVudExpbmUpIC0+XG4gIHN3aXRjaCBtb2RlbC50eXBlXG4gICAgd2hlbiAnZXhwcmVzc2lvbidcbiAgICAgIGxuID0gY3VycmVudExpbmVcbiAgICAgIG1vZGVsLmluc3RhbmNlcy5mb3JFYWNoIChpbnN0KSAtPlxuICAgICAgICB7bG59ID0gdHJhbnNmb3JtTW9kZWwgaW5zdCwgY29udGV4dCwgbG5cblxuICAgICAgcmV0dXJuIHtjdHg6IGNvbnRleHQsIGxuOiBjdXJyZW50TGluZX1cblxuICAgIHdoZW4gJ2luc3RhbmNlJ1xuICAgICAgY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5saW5lLW5vZGUnXG4gICAgICBmaXJzdExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbmxpbmUtbGluZSdcbiAgICAgIFBvbHltZXIuZG9tKGN0eCkuYXBwZW5kQ2hpbGQgZmlyc3RMaW5lXG4gICAgICBQb2x5bWVyLmRvbShjdXJyZW50TGluZSkuYXBwZW5kQ2hpbGQgY3R4XG4gICAgICBcbiAgICAgIGxuID0gZmlyc3RMaW5lXG4gICAgICBtb2RlbC5jaGlsZHJlbi5mb3JFYWNoIChjaGlsZCkgLT5cbiAgICAgICAge2xuLCBjdHh9ID0gdHJhbnNmb3JtTW9kZWwgY2hpbGQsIGN0eCwgbG5cblxuICAgICAgcmV0dXJuIHtjdHg6IGNvbnRleHQsIGxuOiBjdXJyZW50TGluZX1cblxuICAgIHdoZW4gJ2hvbGUnXG4gICAgICBpZiBtb2RlbC5leHByZXNzaW9uP1xuICAgICAgdGhlbiByZXR1cm4gdHJhbnNmb3JtTW9kZWwgbW9kZWwuZXhwcmVzc2lvbiwgY29udGV4dCwgY3VycmVudExpbmVcbiAgICAgIGVsc2UgcmV0dXJuIHtjdHg6IGNvbnRleHQsIGxuOiBjdXJyZW50TGluZX1cblxuICAgIHdoZW4gJ2xpdGVyYWwnXG4gICAgICBsaW5lRWxtID0gY3VycmVudExpbmVcbiAgICAgIChtb2RlbC50ZXh0LnNwbGl0ICdcXG4nKS5mb3JFYWNoIChsaW5lLCBpZHgpIC0+XG4gICAgICAgIGlmIGlkeCBpc250IDBcbiAgICAgICAgICBsaW5lRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5saW5lLWxpbmUnXG4gICAgICAgICAgIyBsaW5lRWxtLmNoaWxkcmVuU2VsZWN0b3IgPSAnaW5saW5lLW5vZGU6bnRoLWNoaWxkKGV2ZW4pLCBpbmxpbmUtcGllY2U6bnRoLWNoaWxkKGV2ZW4pJ1xuICAgICAgICAgIFBvbHltZXIuZG9tKGNvbnRleHQpLmFwcGVuZENoaWxkIGxpbmVFbG1cblxuICAgICAgICBpZiAobGluZS5jaGFyQXQgMCkgaXMgJ1xcdCdcbiAgICAgICAgICBsaW5lRWxtLmluZGVudCsrXG5cbiAgICAgICAgcGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbmxpbmUtcGllY2UnXG4gICAgICAgIHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzcGFuJ1xuICAgICAgICB0ZXh0LmlubmVyVGV4dCA9IGxpbmVcblxuICAgICAgICBQb2x5bWVyLmRvbShwYykuYXBwZW5kQ2hpbGQgdGV4dFxuICAgICAgICBQb2x5bWVyLmRvbShsaW5lRWxtKS5hcHBlbmRDaGlsZCBwY1xuXG4gICAgICByZXR1cm4ge2N0eDogY29udGV4dCwgbG46IGxpbmVFbG19XG5cblxuc3RhcnRMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5saW5lLWxpbmUnXG5Qb2x5bWVyLmRvbShyb290KS5hcHBlbmRDaGlsZCBzdGFydExpbmVcbnRyYW5zZm9ybU1vZGVsIG1vZGVsT2JqZWN0LCByb290LCBzdGFydExpbmVcblxuc2V0VGltZW91dCAoKCkgLT4gcm9vdC51cGRhdGVDaGlsZHJlbigpKSwgMTAwMCJdfQ==
