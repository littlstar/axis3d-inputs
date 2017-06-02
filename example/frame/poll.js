'use strict'

const { KeyboardInput, MouseInput, TouchInput } = require('../..')
const { Quaternion } = require('axis3d')
const clamp = require('clamp')
const lerp = require('lerp')
const vec3 = require('gl-vec3')
const vec2 = require('gl-vec2')
const quat = require('gl-quat')
const eye = require('eye-vector')

const dtor = (x) => x * Math.PI/180
const multiply = (a, b) => quat.multiply([], a, b)
const rotate = (out, angle, t) => {
  return quat.slerp(out, out, multiply(angle, out), t)
}

const d = 0.05
const angles = {
  left: quat.setAxisAngle(new Quaternion(), [0, 1, 0], d*Math.PI),
  right: quat.setAxisAngle(new Quaternion(), [0, 1, 0], -d*Math.PI),
  up: quat.setAxisAngle(new Quaternion(), [1, 0, 0], d*Math.PI),
  down: quat.setAxisAngle(new Quaternion(), [1, 0, 0], -d*Math.PI),
}

module.exports = (ctx, {state}) => {
  const {rotations} = state
  const keyboard = new KeyboardInput(ctx)
  const mouse = new MouseInput(ctx)
  const touch = new TouchInput(ctx)
  const X = new Quaternion()
  const Y = new Quaternion()

  let lastTouchDistance = 0

  return ({time, viewportWidth, viewportHeight}) => {
    const middleX = 0.5*viewportWidth
    const middleY = 0.5*viewportHeight

    const up = (A) => [A[4], A[5], A[6]]

    const {view, near, far} = state.camera
    const {euler} = state
    const direction = vec3.cross([], state.camera.eye, up(view))

    const sensitivity = 4
    const t = 0.5

    mouse(({mouse: m, wheel: w}) => {
      if (1 == m.buttons) {
        if (middleX == m.currentX && middleY == m.currentY) {
          return;
        }

        const x = clamp((m.deltaY)/sensitivity, -0.05, 0.05)
        const y = clamp((m.deltaX)/sensitivity, -0.05, 0.05)

        if (x || y) {
          euler.x += x
          euler.y += y
        }
      }

      if (w.deltaY) {
        const y = w.deltaY
        const d = 0.01
        state.zoom = clamp(state.zoom + d*y, near, far)
      }

      if (w.deltaX) {
        const d = 0.125
        const r = Math.min(d*dtor(w.deltaX), 0.125*Math.PI)
        quat.setAxisAngle(X, [0, 1, 0], r)
        //quat.multiply(rotations.mouse, X, rotations.mouse)
      }
    })

    keyboard(({keys}) => {
      return
      for (const angle in angles) {
        if (true == keys[angle]) {
          switch (angle) {
            case 'left':
            case 'right':
              quat.multiply(rotations.y, angles[angle], rotations.y)
              break

            case 'up':
            case 'down':
              quat.multiply(rotations.x, angles[angle], rotations.x)
              break
          }
        }
      }
    })

    touch(({touches}) => {
      return
      if (touches && 1 == touches.length) {
        const x = clamp(dtor(touches[0].deltaX), 0, 0.125*Math.PI)
        const y = clamp(dtor(touches[0].deltaY), 0, 0.125*Math.PI)
        quat.setAxisAngle(X, [0, 1, 0], x)
        quat.setAxisAngle(Y, [1, 0, 0], y)
        quat.multiply(rotations.touch, multiply(X, Y), rotations.touch)
        lastTouchDistance = 0
      } else if (touches && 2 == touches.length) {
        const offsetA = [touches[0].currentX, touches[0].currentY]
        const offsetB = [touches[1].currentX, touches[1].currentY]
        const currentDistance = vec2.distance(offsetA, offsetB)
        const d = 0.1
        const z = d*(currentDistance - lastTouchDistance)
        state.zoom = clamp(state.zoom - z, near, far)
        //lastTouchDistance = currentDistance
        console.log(state.zoom + z)
      } else {
        lastTouchDistance = 0
      }
    })
  }
}
