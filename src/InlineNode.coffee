Raphael = require 'Raphael'
WaitForChildren = require 'WaitForChildren'

Polymer
  is: 'inline-node'

  ###
  Line ::=
    pieces: Array<Piece | Context>
    tabstops: Number
  Piece ::=
    type: 'piece'
    piece: HTMLElement
  Context ::=
    type: 'context'
    lines: Array<Line>

  _contextLines :: Array<Line>

  RenderedLine ::=
    pieces: Array<Piece>   # can only be actual pieces
    tabstops: Number       # absolute number of tabstops relative to this node
  ###

  properties:
    tabWidth:
      type: Number
      value: 20
    draw:
      type: Boolean
      value: false
    childrenSelector:
      type: String
      value: 'inline-line'

  created: () ->
    WaitForChildren this

  attached: () ->
    @_highlightPaper = Raphael @$.highlight, 1000, 1000
    # @_highlightPaper.canvas.style['z-index'] = -1
    # @_backgroundPaper = Raphael @$.canvas, 1000, 1000
    @_backgroundPaper = Raphael @$.canvas, 1000, 1000
    # @_backgroundPaper.canvas.style['z-index'] = -1

    @childrenReady () =>
      @_populateLines()

      if @draw
        @_arrangeLines()

        @drawBackground()

      @fireReady()

  updateChildren: () ->
    @_populateLines()

    if @draw
      @_arrangeLines()
      @drawBackground()

    @fireReady()

  getLines: () ->
    if not @_contextLines?
      @_populateLines()

    return @_contextLines

  # Returns a set of rectangles defining the
  #  bounds of this element's lines.
  getLineRects: () ->
    offsetY = 0
    @_renderedLines.map (ln, lineNumber) =>
      {width, height} = ln.pieces.reduce \
        ((dimensions, pc) ->
          bcr = pc.piece.getBoundingClientRect()

          # console.log "#{lineNumber}:#{arguments[2]}", bcr.height, dimensions

          width: dimensions.width + bcr.width,
          height: Math.max dimensions.height, bcr.height),
          # width: dimensions.width + pc.piece.offsetWidth,
          # height: Math.max dimensions.height, pc.piece.offsetHeight),
        {width: 0.0, height: 0.0}

      indent = ln.tabstops * @tabWidth
      top = offsetY
      offsetY += height

      left: indent
      top: top
      width: width
      height: height

  getRectsForNode: (node) ->
    Array.prototype.concat.apply @_renderedLines
      .map (ln) ->
        ln.pieces.filter (pc) -> pc.node is node
      .map (pieces, lineNumber) =>
        if pieces.length is 0
        then null
        else
          thisBcr = @getBoundingClientRect()
          firstBcr = pieces[0].piece.getBoundingClientRect()

          beginRect =
            top: firstBcr.top - thisBcr.top
            left: firstBcr.left - thisBcr.left
            width: 0
            height: 0
          pieces.reduce ((rect, pc) ->
            bcr = pc.piece.getBoundingClientRect()

            # console.log "#{lineNumber}:#{arguments[2]}", bcr.height, rect.height

            top: rect.top
            left: rect.left
            width: rect.width + bcr.width
            height: Math.max rect.height, bcr.height), beginRect
      .filter (x) -> x?

  drawBackground: () ->
    @_drawRects @getLineRects(), @_backgroundPaper,
      "fill": "#ddf"
      "stroke": "rgba(255, 255, 255, 0)"

  ###
  Draws boxes around the specified node's child pieces.

  @return [Function] Call this function to undraw the highlight.
  ###
  highlightNode: (node, attrs) ->
    elements = @_drawRects (@getRectsForNode node), @_highlightPaper, attrs
    return () ->
      elements.forEach (elm) -> elm.remove()



  _populateLines: () ->
    @_contextLines = @getContentChildren()
      .reduce ((lines, child) ->
        switch child.tagName.toLowerCase()
          when 'inline-line'
            lines.push child.getLine()
            return lines
          else
            console.log 'encountered tag', child), []

  _arrangeLines: () ->
    collectIntoLines = (context, ctxTabstops = 0, lines = [{pieces: [], tabstops: 0}]) ->
      context.lines.forEach (ln, idx) ->
        if idx isnt 0
          lines.push
            pieces: []
            tabstops: 0

        ctxTabstops += ln.tabstops
        lines[lines.length - 1].tabstops = ctxTabstops

        ln.pieces.forEach (pc) ->
          switch pc.type
            when 'piece'
              pc.node = context.node
              lines[lines.length - 1].pieces.push pc

            when 'context'
              lines = collectIntoLines pc, ctxTabstops, lines
      return lines

    lines = @_contextLines
    node = this
    @_renderedLines = collectIntoLines {lines: lines, node: node}

    offset =
      x: 0
      y: 0

    remove = null
    
    @_renderedLines.forEach (ln) =>
      lineHeight = 0
      offset.x = ln.tabstops * @tabWidth

      ln.pieces.forEach (pc) =>
        pc.piece.addEventListener 'mousedown', (evt) =>
          if remove?
            do remove
          remove = @highlightNode pc.node,
            fill: '#fdd'
            stroke: 'rgba(255, 255, 255, 0)'
          # @_drawRects (@getRectsForNode pc.node), @_highlightPaper,
          #   fill: '#fdd'
          #   stroke: 'rgba(255, 255, 255, 0)'

        pc.piece.style.position = 'absolute'
        @translate3d \
          "#{offset.x}px",
          "#{offset.y}px",
          "0px",
          pc.piece
        bcr = pc.piece.getBoundingClientRect()
        offset.x += bcr.width
        lineHeight = Math.max lineHeight, bcr.height
        # offset.x += pc.piece.offsetWidth
        # lineHeight = Math.max lineHeight, pc.piece.offsetHeight
      offset.y += lineHeight


  ###
  @return The list of Raphael element objects.
  ###
  _drawRects: (rects, paper, attrs = {}) ->
    bcr = @getBoundingClientRect()

    rects.map (rect) ->
      rect = paper.rect rect.left, rect.top, rect.width, rect.height, 2
      Object.keys attrs
        .forEach (attr) ->
          rect.attr attr, attrs[attr]
      return rect