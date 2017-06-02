const createCommand = require('./command')
const keycode = require('keycode')
const events = require('dom-events')

/**
 * Creates a function that is suite to be an
 * Axis3D command and current exposes keyboard
 * state.
 *
 * @param {!Object} ctx
 * @return {Function}
 * @throws TypeError
 */
module.exports = createKeyboardCommand
function createKeyboardCommand(ctx) {
  const keycodes = {}
  const keys = {}
  const state = {
    prev: null,
    current: {keycodes: keycodes, keys: keys}
  }

  if (!ctx || 'object' != typeof ctx || Array.isArray(ctx)) {
    throw new TypeError("createKeyboardCommand(): Expecting context object.")
  }

  events.on(document, 'keydown', onkeydown, false)
  events.on(document, 'keyup', onkeyup, false)
  events.on(window, 'blur', reset)

  ctx.once('destroy', cleanup)
  ctx.on('blur', reset)

  return createCommand(state)

  function onkeydown(e) {
    const code = e.which || e.keyCode || e.charCode
    if (false == ctx.hasFocus) { return false }
    if ('number' == typeof code) {
      keycodes[code] = true
      keys[keycode(code)] = true
    }
  }

  function onkeyup(e) {
    const code = e.which || e.keyCode || e.charCode
    if (false == ctx.hasFocus) { return false }
    if ('number' == typeof code) {
      keycodes[code] = false
      keys[keycode(code)] = false
    }
  }

  function reset() {
    for (const code in keycodes) {
      keycodes[code] = false
    }

    for (const key in keys) {
      keys[key] = false
    }
  }

  function cleanup() {
    reset()
    ctx.off('blur', reset)
    events.off(document, 'keydown', onkeydown)
    events.off(document, 'keyup', onkeyup)
    events.off(window, 'blur', reset)
  }
}
