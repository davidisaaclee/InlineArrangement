WaitForChildren = require 'WaitForChildren'

InlineBlock = Polymer
  is: 'inline-block'

  # properties:
    # softWrap:
    #   type: Boolean
    #   value: true
    # wordWrapColumnPx:
    #   type: String
    #   value: 300

  created: () ->
    WaitForChildren this

  ready: () ->
    @_blockWidth = 0
    @_blockHeight = 0

    @childrenReady () =>
      # console.log 'block ready'
      @_positionChildren()
      do @fireReady

  attached: () ->
    # @async @_positionChildren, 1

  # update: () ->
  #   @_positionChildren()

  getDimensions: () ->
    @getBoundingClientRect()

  getWidth: () ->
    # @getDimensions().width
    @_blockWidth
    # @offsetWidth

  getHeight: () ->
    # @getDimensions().height
    @_blockHeight
    # @offsetHeight

  getInsertionPoint: () ->
    @getContentChildren()
      .reduce ((insertPt, child) =>
        {left, top} = child.getInsertionPoint()
        insertPt.left += left
        insertPt.top += top
        return insertPt), {left: 0, top: 0}

  _positionChildren: () ->
    @_insertPoint =
      left: 0
      top: 0

    @_blockWidth = 0
    @_blockHeight = 0

    @getContentChildren()
      .forEach (child) =>
        @_blockWidth = Math.max(@_blockWidth, @_insertPoint.left + child.getWidth())
        @_blockHeight = Math.max(@_blockHeight, @_insertPoint.top + child.getHeight())

        if child.getHeight() is 0
          console.log child

        insertPt = child.getInsertionPoint()

        Polymer.dom(@root).appendChild child

        child.style.left = "#{@_insertPoint.left}px"
        child.style.top = "#{@_insertPoint.top}px"

        @_insertPoint.left += insertPt.left
        @_insertPoint.top += insertPt.top

    @style.width = "#{@_blockWidth}px"
    @style.height = "#{@_blockHeight}px"