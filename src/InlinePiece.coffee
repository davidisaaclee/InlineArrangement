WaitForChildren = require 'WaitForChildren'

Polymer
  is: 'inline-piece'

  properties:
    text:
      type: String
      value: 'null'
    lineHeight:
      type: Number
      value: 20

  created: () ->
    WaitForChildren this

  ready: () ->
    @style.height = "#{@lineHeight}px"

  attached: () ->
    do @fireReady

  getWidth: () ->
    @getBoundingClientRect().width

  getHeight: () ->
    @getBoundingClientRect().height


Polymer
  is: 'inline-tabstop'

  created: () ->
    WaitForChildren this

  ready: () ->
    do @fireReady