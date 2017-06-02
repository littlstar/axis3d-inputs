'use strict'

const { Frame } = require('axis3d')
const Stats = require('stats.js')
const ready = require('domready')

module.exports = (ctx, opts = {}) => {
  const stats = new Stats()
  const frame = new Frame(ctx)
  const frames = [
    require('./begin'),
    require('./scene'),
    require('./poll'),
    require('./update'),
    require('./end')
  ]

  ready(() => document.body.appendChild(stats.dom))

  for (const f of frames) {
    if ('function' == typeof f) {
      frame(f(ctx, Object.assign({}, opts, {stats})))
    }
  }
}
