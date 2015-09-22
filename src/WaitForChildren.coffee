
###
Mixin to have an element call a callback once all distributed children have
  signalled ready.
###
WaitForChildren = (obj, eventName = 'child-ready') ->
  Object.defineProperty obj, 'childrenReady',
    value: (callback) ->
      receivedCount = 0
      onChildrenReady = (evt) =>
        evt.stopPropagation()
        receivedCount++
        if receivedCount is @getContentChildren().length
          @removeEventListener eventName, onChildrenReady
          do callback
      @addEventListener eventName, onChildrenReady

  # Object.defineProperty obj, 'bubbleChildrenReady',
  #   value: () ->
  #     receivedCount = 0
  #     onChildrenReady = () =>
  #       receivedCount++
  #       if receivedCount is @getContentChildren().length
  #         @removeEventListener eventName, onChildrenReady
  #         do @fireReady
  #     @addEventListener eventName, onChildrenReady

  Object.defineProperty obj, 'fireReady',
    value: () -> @fire eventName


module.exports = WaitForChildren