ChainableElement = Polymer
  is: 'chainable-element'

  created: () ->
    ###
    @property [{left: Number, top: Number}] insertionPoint The origin for the next
      element in the chain.
    ###
    Object.defineProperty this, 'insertionPoint',
      get: () ->
        

    ###
    @property [Number] width The width of the widest child of this element.
    ###

    ###
    @property [Number] height The combined height of this element's children.
    ###

  attached: () ->
