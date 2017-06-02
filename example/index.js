'use strict'

/**
 * Module dependencies.
 */

const { Context } = require('axis3d')
const initFrames = require('./frame')
const ready = require('domready')
const state = require('./state')

const ctx = new Context()

ready(() => {
  ctx.focus()
  initFrames(ctx, {state})
})
