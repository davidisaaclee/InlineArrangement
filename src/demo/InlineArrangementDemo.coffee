modelObject =
  type: 'hole'
  expression:
    type: 'expression'
    instances: [
      type: 'instance'
      children: [
        type: 'literal'
        text: 'function foo ('
       ,
        type: 'hole'
        expression: null
          # type: 'expression'
          # instances: []
       ,
        type: 'literal'
        text: ') {\n\t'
       ,
        type: 'hole'
        expression: null
       ,
        type: 'literal'
        text: ' \n}'
      ]
    ]



arrangement = document.querySelector '#insert-point'

transformModel = (model, outerBlock) ->
  switch model.type
    when 'expression'
      elt = document.createElement 'inline-block'

      model.instances.forEach (instance) ->
        transformModel instance, elt

      Polymer.dom(outerBlock).appendChild elt
    when 'instance'
      elt = document.createElement 'inline-block'

      if model.children.length > 0
        model.children.forEach (child) ->
          transformModel child, elt

      Polymer.dom(outerBlock).appendChild elt
    when 'hole'
      if model.expression?
        transformModel model.expression, outerBlock
        return outerBlock
    when 'literal'
      fragment = document.createElement 'inline-fragment'

      for ln in model.text.split '\n'
        lineDiv = document.createElement 'div'
        lineDiv.classList.add 'line'
        piece = document.createElement 'inline-piece'
        textSpan = document.createElement 'span'
        textSpan.innerText = ln
        Polymer.dom(piece).appendChild textSpan
        Polymer.dom(lineDiv).appendChild piece
        Polymer.dom(fragment).appendChild lineDiv

      Polymer.dom(outerBlock).appendChild fragment

block = document.createElement 'inline-block'
transformModel modelObject, block
Polymer.dom(arrangement).appendChild block
arrangement.update()