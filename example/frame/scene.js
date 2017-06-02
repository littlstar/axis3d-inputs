'use strict'

const {
  PerspectiveCamera,
  DirectionalLight,
  PhongMaterial,
  Geometry,
  Vector3,
  Color,
  Mesh,
} = require('axis3d')

const Bunny = require('bunny')
const mat4 = require('gl-mat4')
const vec3 = require('gl-vec3')

for (const p of Bunny.positions) {
  p[1] = p[1] - 4
}

module.exports = (ctx, {state} = {}) => {
  const material = new PhongMaterial(ctx, state.material)
  const position = new Vector3(...state.camera.position)
  const purple = new Color('purple')
  const camera = new PerspectiveCamera(ctx, state.camera)
  const bunny = new Mesh(ctx, {geometry: Bunny})
  const light = new DirectionalLight(ctx, state.light)

  const g = new Geometry({complex: Bunny})
  console.log(g instanceof Geometry)

  return () => {
    light({position: [5, 5, 5], intensity: 2})
    light({position: [-5, -5, -5], intensity: 0.5})
    position.z = state.camera.position.z + state.zoom
    camera(Object.assign({}, state.camera, {position}), ({
      direction,
      view,
      eye,
      fov,
      up,
    }) => {
      Object.assign(state.camera, {direction, view, eye, fov, up})
      material(() => {
        bunny({scale: 0.5})
      })
    })
  }
}
