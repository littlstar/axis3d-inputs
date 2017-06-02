'use strict'
const {
  Quaternion,
  Vector3,
  Euler
} = require('axis3d')

const mat4 = require('gl-mat4')

module.exports = {
  euler: new Euler(),
  camera: {
    rotation: new Quaternion(),
    position: new Vector3(5, 5, 5),
    target: new Vector3(),
    view: mat4.identity([]),
    eye: [],
    near: 0.01,
    far: 1000,
    fov: 60*Math.PI/180,
    up: null,
  },

  rotations: {
    x: new Quaternion(),
    y: new Quaternion(),
  },

  material: {},
  light: {},
  zoom: 0
}
