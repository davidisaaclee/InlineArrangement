WaitForChildren = require 'WaitForChildren'

Polymer
  is: 'inline-line'

  properties:
    indent:
      type: Number
      value: 0

  created: () ->
    WaitForChildren this

  ready: () ->
    @childrenReady () =>
      @_populateLines()
      @fireReady()

  ###
  Return ::= Line
  Context ::= Array<Line>
  Line ::=
    pieces: Array<inline-piece | Context>
    tabstops: Number
  ###
  getLine: () -> @_line

  _populateLines: () ->
    collectLines = (line, child) ->
      switch child.tagName.toLowerCase()
        # when 'inline-tabstop'
        #   line.tabstops++
        #   return line
        when 'inline-piece'
          line.pieces.push
            type: 'piece'
            piece: child
          return line
        when 'inline-node'
          line.pieces.push
            type: 'context'
            lines: child.getLines()
            node: child
          return line
        else
          console.log 'No case for ', child

    indentLevel = @indent
    @_line = @getContentChildren()
      .reduce collectLines, {type: 'line', pieces: [], tabstops: indentLevel}