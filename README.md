axis3d-inputs
=============

[Axis3D](https://github.com/littlstar/axis3d) commands that provide state for user inputs.

## Installation

```sh
$ npm install axis3d-inputs
```

## Usage

```js
const KeyboardInput = require('axis3d-inputs/keyboard')
const MouseInput = require('axis3d-inputs/keyboard')
const TouchInput = require('axis3d-inputs/keyboard')
const quat = require('gl-quat')
const vec3 = require('gl-vec3')

const keyboard = new KeyboardInput(ctx)
const mouse = new MouseInput(ctx)
const touch = new TouchInput(ctx)

const rotation = quat.identity([])
const position = [0, 0, 0]

frame(() => {
  keyboard(({keys}) => {
    if (keys.left) {
      vec3.add(position, position, [-1, 0, 0])
    } else if (keys.right) {
      vec3.add(position, position, [+1, 0, 0])
    }

    if (keys.up) {
      vec3.add(position, position, [0, 0, +1])
    } else if (keys.down) {
      vec3.add(position, position, [0, 0, -1])
    }
  })

  mouse(({mouse, wheel}) => {
    if (mouse.buttons > 0) {
      quat.rotateY(rotation, rotation, mouse.deltaX)
      quat.rotateX(rotation, rotation, mouse.deltaY)
    }

    if (wheel.deltaY) {
      vec3.add(position, position, [0, 0, 0.5*wheel.deltaY])
    }
  })

  touch(({touches}) => {
    if (touches) {
      switch (touches.length) {
        case 1:
          quat.rotateY(rotation, rotation, touches[0].deltaX)
          quat.rotateX(rotation, rotation, touches[0].deltaY)
          break;

        case 2: break;
        default:
      }
    }
  })
})
```

## Supported Inputs

* Keyboard
* Mouse
* Touch

## API

This module exposes constructors for commands compatible with Axis3D.
Commands are just functions that accept arguments and a callback. The
callback function exposes context variables associated with the command.
Context variables can hold information about the current state of the
input in use.

### KeyboardInput(ctx)

The `KeyboardInput` command provides keyboard context variables that
expose which keys are currently pressed (or not).

```js
keyboard(({keys, keycodes}) => {
  if (keys.h) left()
  if (keys.l) right()
  if (keys.k) up()
  if (keys.j) down()
})
```

#### Context Variables

* `keys` - An object containing a map of key names and a boolean value
  indicating that the key is currently pressed
* `keycodes` - An object containing a map of key codes and a boolean
  value indicating that the key is currently pressed

### MouseInput(ctx)

The `MouseInput` command provides mouse context variables that
expose the current mouse state including the wheel and currently pressed
buttons count. The current, delta, and previous `[x, y]` coordinates of
the mouse cursor position and wheel are exposed.

```js
mouse(({mouse, wheel}) => {
  quat.setAxisAngle(xRotation, [1, 0, 0], 0.5*mouse.deltaY)
  quat.setAxisAngle(yRotation, [0, 1, 0], 0.5*mouse.deltaX)
})
  fieldOfView += 0.5*wheel.deltaY
```

#### Context Variables

* `mouse` - The current mouse state
  * `buttons` - Number of mouse buttons currently pressed
  * `currentX` - The current `x` coordinate of the mouse cursor
  * `currentY` - The current `y` coordinate of the mouse cursor
  * `deltaX` - The differnence between the previous and current `x` coordinate of the mouse cursor
  * `deltaY` - The differnence between the previous and current `y` coordinate of the mouse cursor
  * `prevX` - The previous `x` coordinate of the mouse cursor
  * `prevY` - The previous `y` coordinate of the mouse cursor

### TouchInput(ctx)

The `TouchInput` command provides touch context variables that
expose the current touch state including the wheel and currently pressed
buttons count. The current, delta, and previous `[x, y]` coordinates of
the touch position and wheel are exposed.

```js
touch(({touches, wheel}) => {
  if (1 == touches.length) {
    quat.setAxisAngle(xRotation, [1, 0, 0], 0.5*touches[0].deltaY)
    quat.setAxisAngle(yRotation, [0, 1, 0], 0.5*touches[0].deltaX)
  }
})
```

#### Context Variables

* `touches` - Currently active touches where `touches[i]` is:
  * `currentX` - The current `x` coordinate of the touch
  * `currentY` - The current `y` coordinate of the touch
  * `offsetX` - The current `x` coordinate offset of the touch position
  * `offsetY` - The current `y` coordinate offset of the touch position
  * `startX` - The start `x` coordinate offset of the touch
  * `startY` - The start `y` coordinate offset of the touch
  * `deltaX` - The differnence between the previous and current `x` coordinate of the touch position
  * `deltaY` - The differnence between the previous and current `y` coordinate of the touch position
  * `prevX` - The previous `x` coordinate of the touch
  * `prevY` - The previous `y` coordinate of the touch

## License

MIT
