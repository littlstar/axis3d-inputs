'use strict'

/**
 * Module dependencies.
 */
const createCommand = require('./command')
const getEventOffset = require('mouse-event-offset')
const events = require('dom-events')
const raf = require('raf')

/**
 * Defaulttouch sttae
 */
const kDefaultTouchState = {
  currentX: 0,
  currentY: 0,
  offsetX: 0,
  offsetY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  prevX: 0,
  prevY: 0,
}

/**
 * Creates a function that is suite to be an
 * Axis3D command and current exposes touch
 * state.
 *
 * @param {!Object} ctx
 * @return {Function}
 */
module.exports = createTouchCommand
function createTouchCommand(ctx) {
  const touches = []
  const state = {
    prev: null,
    current: {touches: touches}
  }

  if (!ctx || 'object' != typeof ctx || Array.isArray(ctx)) {
    throw new TypeError("createTouchCommand(): Expecting context object.")
  }

  events.on(ctx.domElement, 'touchstart', ontouchstart, false)
  events.on(ctx.domElement, 'touchmove',  ontouchmove, false)
  events.on(ctx.domElement, 'touchend', ontouchend, false)
  events.on(ctx.domElement, 'touchcancel', ontouchend, false)

  ctx.once('destroy', function() {
    events.off(ctx.domElement, 'touchstart', ontouchstart, false)
    events.off(ctx.domElement, 'touchmove', ontouchmove, false)
    events.off(ctx.domElement, 'touchend', ontouchend, false)
    events.off(ctx.domElement, 'touchcancel', ontouchend, false)
  })

  return createCommand(state)

  function createTouch(i, e) {
    const x = e.touches[i].clientX
    const y = e.touches[i].clientY
    return Object.assign({}, kDefaultTouchState, {
      currentX: x,
      currentY: y,
      startX: x,
      startY: y,
    })
  }

  function synchronizeTouch(i, e) {
    const touchTarget = e.targetTouches[i]
    const touch = touches[i]
    const offset = getEventOffset(e)

    if (null == touch || null == touchTarget) {
      return
    }

    touch.prevX = touch.currentX
    touch.prevY = touch.currentY
    touch.deltaX = touchTarget.clientX - touch.currentX
    touch.deltaY = touchTarget.clientY - touch.currentY
    touch.offsetX = offset[0]
    touch.offsetY = offset[1]
    touch.currentX = touchTarget.clientX
    touch.currentY = touchTarget.clientY

    raf(function() {
      Object.assign(touch, {deltaX: 0, deltaY: 0})
    })
  }

  function ontouchstart(e) {
    e.preventDefault()
    state.current.event = e
    for (let i = 0; i < e.touches.length; ++i) {
      touches[i] = createTouch(i, e)
      synchronizeTouch(i, e)
    }
  }

  function ontouchend(e) {
    e.preventDefault()
    touches.splice(0, touches.length)
  }

  function ontouchmove(e) {
    if (touches && touches.length) {
      for (let i = 0; i < touches.length; ++i) {
        synchronizeTouch(i, e)
      }
    }
  }
}
