WaitForChildren = require 'WaitForChildren'

isFunction = (obj) ->
  Object.prototype.toString.call(obj) is '[object Function]'

intersperse = (withElm, list) ->
  l = list.length
  for i in [0...(l - 1)]
    if isFunction withElm
      list.splice (i * 2 + 1), 0, do withElm
    else
      list.splice (i * 2 + 1), 0, withElm
  return list


Polymer
  is: 'inline-fragment'

  properties:
    lines:
      type: Array
      value: () -> []

    lineHeight:
      type: Number
      value: 20
      observe: '_updateLineHeight'

  created: () ->
    WaitForChildren this

  ready: () ->
    Object.defineProperty this, '_lineElements',
      get: () ->
        Polymer.dom(this).querySelectorAll('.line')

    Object.defineProperty this, '_pieceElements',
      get: () ->
        @_lineElements.reduce ((pieces, ln) ->
          pieceNodeList = ln.querySelectorAll 'inline-piece'
          pieceArray = Array.prototype.slice.call pieceNodeList
          pieces.concat pieceArray), []

    @childrenReady () =>
      # console.log 'fragment ready'
      do @fireReady

  populateWithText: (text) ->
    @lines = @_textToLines text

  getWidth: () ->
    if @_lineElements.length is 0
    then 0
    else
      @_lineElements
        .map @_getLineWidthFromElement
        .sort((a, b) -> b - a)[0]

  getHeight: () ->
    if @_lineElements.length is 0
    then 0
    else
      @_lineElements
        .map @_getLineHeightFromElement
        .reduce ((a, b) -> a + b), 0

  getLineWidth: (lineIndex) ->
    ln = @_lineElements[lineIndex]
    if ln?
    then @_getLineWidthFromElement ln
    else null

  getLineHeight: (lineIndex) ->
    ln = @_lineElements[lineIndex]
    if ln?
    then @_getLineHeightFromElement ln
    else null

  getInsertionPoint: () ->
    if @_lineElements.length is 0
      console.warn 'Fragment has no lines', this
      top: 0
      left: 0
    else
      last = @_lineElements.length - 1

      top: @getHeight() - (@getLineHeight last)
      left: @getLineWidth last


  _getLineWidthFromElement: (ln) ->
    pieceNodeList = ln.querySelectorAll 'inline-piece'
    pieceArray = Array.prototype.slice.call pieceNodeList

    pieceArray.reduce ((lineWidth, piece) ->
      lineWidth += piece.getWidth()), 0

  _getLineHeightFromElement: (ln) ->
    pieceNodeList = ln.querySelectorAll 'inline-piece'
    pieceArray = Array.prototype.slice.call pieceNodeList
    pieceArray.reduce ((lineHeight, piece) ->
      Math.max lineHeight, piece.getHeight()), 0

  # _textToLines: (text) ->
  #   text
  #     .split '\n'
  #     .map (line) =>
  #       l = line
  #         .split '\t'
  #         .map (elm) ->
  #           type: 'text'
  #           value: elm
  #       return intersperse @_makeTabElement, l
  #         .filter (elm) -> not (elm.type is 'text' and elm.value.length is 0)

  # _makeTabElement: () ->
  #   type: 'tab'

  # _checkField: (obj, field, fieldVal) ->
  #   obj[field] is fieldVal