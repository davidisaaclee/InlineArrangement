WaitForChildren = require 'WaitForChildren'

InlineArrangement = Polymer
  is: 'inline-arrangement'

  # properties:
    # lineHeight:
    #   type: Number
    #   value: 20
    # softWrap:
    #   type: Boolean
    #   value: true
    # wordWrapColumnPx:
    #   type: String
    #   value: 300

  created: () ->
    WaitForChildren this

  ready: () ->

  attached: () ->
    # console.log 'inline-arrangement attached'
    @async =>

  update: () ->
    @childrenReady () =>
      console.log 'children ready'
      @getContentChildren()
        .forEach (child) ->
          console.log 'updating ', child
          # child.update()

    # console.log @children
      # .forEach (child) ->
      #   console.log 'updating ', child
      #   child.update()

    @distributeContent()
    @async () =>
      console.log 'async', @getContentChildren()
    console.log 'sync', @getContentChildren()