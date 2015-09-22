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
        expression:
          type: 'expression'
          instances: [
            type: 'instance'
            children: [
              type: 'literal'
              text: "I'm inside here! \nand have multiple lines"
            ]
          ]
       ,
        type: 'literal'
        text: ') {\n\t'
       ,
        type: 'hole'
        expression:
          type: 'expression'
          instances: [
            type: 'instance'
            children: [
              type: 'literal'
              text: "I'm inside here! \n\tand have multiple lines"
            ]
          ]
       ,
        type: 'literal'
        text: '\n}'
      ]
    ]



root = document.querySelector '#root'

transformModel = (model, context, currentLine) ->
  switch model.type
    when 'expression'
      ln = currentLine
      model.instances.forEach (inst) ->
        {ln} = transformModel inst, context, ln

      return {ctx: context, ln: currentLine}

    when 'instance'
      ctx = document.createElement 'inline-node'
      firstLine = document.createElement 'inline-line'
      Polymer.dom(ctx).appendChild firstLine
      Polymer.dom(currentLine).appendChild ctx
      
      ln = firstLine
      model.children.forEach (child) ->
        {ln, ctx} = transformModel child, ctx, ln

      return {ctx: context, ln: currentLine}

    when 'hole'
      if model.expression?
      then return transformModel model.expression, context, currentLine
      else return {ctx: context, ln: currentLine}

    when 'literal'
      lineElm = currentLine
      (model.text.split '\n').forEach (line, idx) ->
        if idx isnt 0
          lineElm = document.createElement 'inline-line'
          # lineElm.childrenSelector = 'inline-node:nth-child(even), inline-piece:nth-child(even)'
          Polymer.dom(context).appendChild lineElm

        if (line.charAt 0) is '\t'
          lineElm.indent++

        pc = document.createElement 'inline-piece'
        text = document.createElement 'span'
        text.innerText = line

        Polymer.dom(pc).appendChild text
        Polymer.dom(lineElm).appendChild pc

      return {ctx: context, ln: lineElm}


startLine = document.createElement 'inline-line'
Polymer.dom(root).appendChild startLine
transformModel modelObject, root, startLine

setTimeout (() -> root.updateChildren()), 1000