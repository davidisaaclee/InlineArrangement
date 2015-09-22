(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var arrangement, block, modelObject, transformModel;

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
            expression: null
          }, {
            type: 'literal',
            text: ') {\n\t'
          }, {
            type: 'hole',
            expression: null
          }, {
            type: 'literal',
            text: ' \n}'
          }
        ]
      }
    ]
  }
};

arrangement = document.querySelector('#insert-point');

transformModel = function(model, outerBlock) {
  var elt, fragment, i, len, lineDiv, ln, piece, ref, textSpan;
  switch (model.type) {
    case 'expression':
      elt = document.createElement('inline-block');
      model.instances.forEach(function(instance) {
        return transformModel(instance, elt);
      });
      return Polymer.dom(outerBlock).appendChild(elt);
    case 'instance':
      elt = document.createElement('inline-block');
      if (model.children.length > 0) {
        model.children.forEach(function(child) {
          return transformModel(child, elt);
        });
      }
      return Polymer.dom(outerBlock).appendChild(elt);
    case 'hole':
      if (model.expression != null) {
        transformModel(model.expression, outerBlock);
        return outerBlock;
      }
      break;
    case 'literal':
      fragment = document.createElement('inline-fragment');
      ref = model.text.split('\n');
      for (i = 0, len = ref.length; i < len; i++) {
        ln = ref[i];
        lineDiv = document.createElement('div');
        lineDiv.classList.add('line');
        piece = document.createElement('inline-piece');
        textSpan = document.createElement('span');
        textSpan.innerText = ln;
        Polymer.dom(piece).appendChild(textSpan);
        Polymer.dom(lineDiv).appendChild(piece);
        Polymer.dom(fragment).appendChild(lineDiv);
      }
      return Polymer.dom(outerBlock).appendChild(fragment);
  }
};

block = document.createElement('inline-block');

transformModel(modelObject, block);

Polymer.dom(arrangement).appendChild(block);

arrangement.update();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGF2aWQvRG9jdW1lbnRzL1dvcmsvSW5saW5lQXJyYW5nZW1lbnQvc3JjL2RlbW8vSW5saW5lQXJyYW5nZW1lbnREZW1vLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsV0FBQSxHQUNFO0VBQUEsSUFBQSxFQUFNLE1BQU47RUFDQSxVQUFBLEVBQ0U7SUFBQSxJQUFBLEVBQU0sWUFBTjtJQUNBLFNBQUEsRUFBVztNQUNUO1FBQUEsSUFBQSxFQUFNLFVBQU47UUFDQSxRQUFBLEVBQVU7VUFDUjtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsSUFBQSxFQUFNLGdCQUROO1dBRFEsRUFJUjtZQUFBLElBQUEsRUFBTSxNQUFOO1lBQ0EsVUFBQSxFQUFZLElBRFo7V0FKUSxFQVNSO1lBQUEsSUFBQSxFQUFNLFNBQU47WUFDQSxJQUFBLEVBQU0sU0FETjtXQVRRLEVBWVI7WUFBQSxJQUFBLEVBQU0sTUFBTjtZQUNBLFVBQUEsRUFBWSxJQURaO1dBWlEsRUFlUjtZQUFBLElBQUEsRUFBTSxTQUFOO1lBQ0EsSUFBQSxFQUFNLE1BRE47V0FmUTtTQURWO09BRFM7S0FEWDtHQUZGOzs7QUEyQkYsV0FBQSxHQUFjLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCOztBQUVkLGNBQUEsR0FBaUIsU0FBQyxLQUFELEVBQVEsVUFBUjtBQUNmLE1BQUE7QUFBQSxVQUFPLEtBQUssQ0FBQyxJQUFiO0FBQUEsU0FDTyxZQURQO01BRUksR0FBQSxHQUFNLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCO01BRU4sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFoQixDQUF3QixTQUFDLFFBQUQ7ZUFDdEIsY0FBQSxDQUFlLFFBQWYsRUFBeUIsR0FBekI7TUFEc0IsQ0FBeEI7YUFHQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosQ0FBdUIsQ0FBQyxXQUF4QixDQUFvQyxHQUFwQztBQVBKLFNBUU8sVUFSUDtNQVNJLEdBQUEsR0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QjtNQUVOLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFmLEdBQXdCLENBQTNCO1FBQ0UsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFmLENBQXVCLFNBQUMsS0FBRDtpQkFDckIsY0FBQSxDQUFlLEtBQWYsRUFBc0IsR0FBdEI7UUFEcUIsQ0FBdkIsRUFERjs7YUFJQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQVosQ0FBdUIsQ0FBQyxXQUF4QixDQUFvQyxHQUFwQztBQWZKLFNBZ0JPLE1BaEJQO01BaUJJLElBQUcsd0JBQUg7UUFDRSxjQUFBLENBQWUsS0FBSyxDQUFDLFVBQXJCLEVBQWlDLFVBQWpDO0FBQ0EsZUFBTyxXQUZUOztBQURHO0FBaEJQLFNBb0JPLFNBcEJQO01BcUJJLFFBQUEsR0FBVyxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkI7QUFFWDtBQUFBLFdBQUEscUNBQUE7O1FBQ0UsT0FBQSxHQUFVLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCO1FBQ1YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFsQixDQUFzQixNQUF0QjtRQUNBLEtBQUEsR0FBUSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QjtRQUNSLFFBQUEsR0FBVyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QjtRQUNYLFFBQVEsQ0FBQyxTQUFULEdBQXFCO1FBQ3JCLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixDQUFrQixDQUFDLFdBQW5CLENBQStCLFFBQS9CO1FBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaLENBQW9CLENBQUMsV0FBckIsQ0FBaUMsS0FBakM7UUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosQ0FBcUIsQ0FBQyxXQUF0QixDQUFrQyxPQUFsQztBQVJGO2FBVUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLENBQXVCLENBQUMsV0FBeEIsQ0FBb0MsUUFBcEM7QUFqQ0o7QUFEZTs7QUFvQ2pCLEtBQUEsR0FBUSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2Qjs7QUFDUixjQUFBLENBQWUsV0FBZixFQUE0QixLQUE1Qjs7QUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVosQ0FBd0IsQ0FBQyxXQUF6QixDQUFxQyxLQUFyQzs7QUFDQSxXQUFXLENBQUMsTUFBWixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZGVsT2JqZWN0ID1cbiAgdHlwZTogJ2hvbGUnXG4gIGV4cHJlc3Npb246XG4gICAgdHlwZTogJ2V4cHJlc3Npb24nXG4gICAgaW5zdGFuY2VzOiBbXG4gICAgICB0eXBlOiAnaW5zdGFuY2UnXG4gICAgICBjaGlsZHJlbjogW1xuICAgICAgICB0eXBlOiAnbGl0ZXJhbCdcbiAgICAgICAgdGV4dDogJ2Z1bmN0aW9uIGZvbyAoJ1xuICAgICAgICxcbiAgICAgICAgdHlwZTogJ2hvbGUnXG4gICAgICAgIGV4cHJlc3Npb246IG51bGxcbiAgICAgICAgICAjIHR5cGU6ICdleHByZXNzaW9uJ1xuICAgICAgICAgICMgaW5zdGFuY2VzOiBbXVxuICAgICAgICxcbiAgICAgICAgdHlwZTogJ2xpdGVyYWwnXG4gICAgICAgIHRleHQ6ICcpIHtcXG5cXHQnXG4gICAgICAgLFxuICAgICAgICB0eXBlOiAnaG9sZSdcbiAgICAgICAgZXhwcmVzc2lvbjogbnVsbFxuICAgICAgICxcbiAgICAgICAgdHlwZTogJ2xpdGVyYWwnXG4gICAgICAgIHRleHQ6ICcgXFxufSdcbiAgICAgIF1cbiAgICBdXG5cblxuXG5hcnJhbmdlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgJyNpbnNlcnQtcG9pbnQnXG5cbnRyYW5zZm9ybU1vZGVsID0gKG1vZGVsLCBvdXRlckJsb2NrKSAtPlxuICBzd2l0Y2ggbW9kZWwudHlwZVxuICAgIHdoZW4gJ2V4cHJlc3Npb24nXG4gICAgICBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbmxpbmUtYmxvY2snXG5cbiAgICAgIG1vZGVsLmluc3RhbmNlcy5mb3JFYWNoIChpbnN0YW5jZSkgLT5cbiAgICAgICAgdHJhbnNmb3JtTW9kZWwgaW5zdGFuY2UsIGVsdFxuXG4gICAgICBQb2x5bWVyLmRvbShvdXRlckJsb2NrKS5hcHBlbmRDaGlsZCBlbHRcbiAgICB3aGVuICdpbnN0YW5jZSdcbiAgICAgIGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lubGluZS1ibG9jaydcblxuICAgICAgaWYgbW9kZWwuY2hpbGRyZW4ubGVuZ3RoID4gMFxuICAgICAgICBtb2RlbC5jaGlsZHJlbi5mb3JFYWNoIChjaGlsZCkgLT5cbiAgICAgICAgICB0cmFuc2Zvcm1Nb2RlbCBjaGlsZCwgZWx0XG5cbiAgICAgIFBvbHltZXIuZG9tKG91dGVyQmxvY2spLmFwcGVuZENoaWxkIGVsdFxuICAgIHdoZW4gJ2hvbGUnXG4gICAgICBpZiBtb2RlbC5leHByZXNzaW9uP1xuICAgICAgICB0cmFuc2Zvcm1Nb2RlbCBtb2RlbC5leHByZXNzaW9uLCBvdXRlckJsb2NrXG4gICAgICAgIHJldHVybiBvdXRlckJsb2NrXG4gICAgd2hlbiAnbGl0ZXJhbCdcbiAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5saW5lLWZyYWdtZW50J1xuXG4gICAgICBmb3IgbG4gaW4gbW9kZWwudGV4dC5zcGxpdCAnXFxuJ1xuICAgICAgICBsaW5lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICBsaW5lRGl2LmNsYXNzTGlzdC5hZGQgJ2xpbmUnXG4gICAgICAgIHBpZWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5saW5lLXBpZWNlJ1xuICAgICAgICB0ZXh0U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NwYW4nXG4gICAgICAgIHRleHRTcGFuLmlubmVyVGV4dCA9IGxuXG4gICAgICAgIFBvbHltZXIuZG9tKHBpZWNlKS5hcHBlbmRDaGlsZCB0ZXh0U3BhblxuICAgICAgICBQb2x5bWVyLmRvbShsaW5lRGl2KS5hcHBlbmRDaGlsZCBwaWVjZVxuICAgICAgICBQb2x5bWVyLmRvbShmcmFnbWVudCkuYXBwZW5kQ2hpbGQgbGluZURpdlxuXG4gICAgICBQb2x5bWVyLmRvbShvdXRlckJsb2NrKS5hcHBlbmRDaGlsZCBmcmFnbWVudFxuXG5ibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lubGluZS1ibG9jaydcbnRyYW5zZm9ybU1vZGVsIG1vZGVsT2JqZWN0LCBibG9ja1xuUG9seW1lci5kb20oYXJyYW5nZW1lbnQpLmFwcGVuZENoaWxkIGJsb2NrXG5hcnJhbmdlbWVudC51cGRhdGUoKSJdfQ==
