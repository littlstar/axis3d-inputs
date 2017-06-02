'use strict'

const { Quaternion } = require('axis3d')
const mat4 = require('gl-mat4')
const mat3 = require('gl-mat3')
const quat = require('gl-quat')
const vec3 = require('gl-vec3')

const multiply = (a, b) => quat.multiply([], a, b)
const conjugate = (a) => quat.conjugate([], a)
const rotate = (a, b, t) => quat.slerp(a, a, multiply(b, a), t)

module.exports = (ctx, {state}) => {
  const {camera, rotations, euler} = state
  const rotation = new Quaternion()
  const f = 0.1
  quat.identity(rotation)
  return () => {
    quat.setAxisAngle(rotations.x, [1, 0, 0], euler.x * f)
    quat.setAxisAngle(rotations.y, [0, 1, 0], euler.y)
    quat.slerp(rotation, rotation, rotations.y, f)
    quat.multiply(rotation, rotations.x, rotation)
    quat.normalize(rotation, rotation)
    quat.copy(camera.rotation, rotation)
  }
}

