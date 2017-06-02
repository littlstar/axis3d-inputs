/**
 * Creates a function that is suiatable to be an
 * Axis3D command. State is preserved and updated
 * each call.
 *
 * @param {?(Object)} state
 * @return {Function}
 */
module.exports = function (state) {
  if (null == state || 'object' != typeof state) {
    state = {}
  }

  return function (args, done) {
    // ensure correct values
    if ('function' == typeof args) {
      done = args
      args = {}
    }

    args = 'object' == typeof args && args ? args : {}
    done = 'function' == typeof done ? done : function() {}
    state.prev = state.current
    state.current = Object.assign({}, state.prev, args)
    done(state.current, args, state.prev)
  }
}
