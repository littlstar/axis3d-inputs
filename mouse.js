const createCommand = require('./command')
const onMouseChange = require('mouse-change')
const onMouseWheel = require('mouse-wheel')
const coalesce = require('defined')
const events = require('dom-events')
const raf = require('raf')

/**
 * Default mouse wheel state
 */
const kDefaultMouseWheelState = {
  currentX: 0,
  currentY: 0,
  deltaX: 0,
  deltaY: 0,
  prevX: 0,
  prevY: 0,
}

/**
 * Default mouse state
 */
const kDefaultMouseState = {
  buttons: 0,
  currentX: 0,
  currentY: 0,
  deltaX: 0,
  deltaY: 0,
  prevX: 0,
  prevY: 0,
}

/**
 * Creates a function that is suite to be an
 * Axis3D command and current exposes mouse
 * state.
 *
 * @param {!Object} ctx
 * @param {?(Object)} opts
 * @return {Function}
 */
module.exports = createMouseCommand
function createMouseCommand(ctx, opts) {
  if (!ctx || 'object' != typeof ctx || Array.isArray(ctx)) {
    throw new TypeError("createMouseCommand(): Expecting context object.")
  } else if (!opts || 'object' != typeof opts) {
    opts = {}
  }

  const allowWheel = coalesce(opts.allowWheel, true)
  const wheel = Object.assign({}, kDefaultMouseWheelState)
  const mouse = Object.assign({}, kDefaultMouseState)
  const state = {
    prev: null,
    current: {mouse: mouse, wheel: wheel, allowWheel: allowWheel}
  }

  ctx.on('blur', function () { mouse.buttons = 0 })

  if (ctx.domElement) {
    const mouseChangeListener = onMouseChange(ctx.domElement, onmousechange)
    const mouseWheelListener = onMouseWheel(ctx.domElement, onmousewheel)

    ctx.once('beforedestroy', function () {
      mouseChangeListener.enabled = false
      if (ctx.domElement) {
        events.off(ctx.domElement, mouseWheelListener)
      }
    })
  }

  return createCommand(state)

  function onmousechange(b, x, y) {
    synchronizeMouse(b, x, y)
  }

  function onmousewheel(dx, dy, dz) {
    if (state.current.allowWheel) {
      synchronizeMouseWheel(dx, dy, dz)
    }
  }

  function synchronizeMouse(b, x, y) {
    mouse.buttons = b

    raf(function () {
      Object.assign(mouse, {deltaX: 0, deltaY: 0})
    })

    if (mouse.currentX != x || mouse.currentY != y) {
      mouse.prevX = mouse.currentX
      mouse.prevY = mouse.currentY
      mouse.deltaX = x - mouse.currentX
      mouse.deltaY = y - mouse.currentY
      mouse.currentX = x
      mouse.currentY = y
    }
  }

  function synchronizeMouseWheel(dx, dy, dz) {
    const currentX = wheel.currentX
    const currentY = wheel.currentY
    const currentZ = wheel.currentZ

    raf(function () {
      Object.assign(wheel, {deltaX: 0, deltaY: 0, deltaZ: 0})
    })

    Object.assign(wheel, {
      currentX: currentX + dx,
      currentY: currentY + dy,
      currentZ: currentZ + dz,
      deltaX: dx,
      deltaY: dy,
      deltaZ: dz,
      prevX: currentX,
      prevY: currentY,
      prevZ: currentZ,
    })
  }
}
