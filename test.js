const { KeyboardInput, MouseInput, TouchInput } = require('./')
const { Context } = require('axis3d')
const test = require('tape')
const ctx = new Context()

test("KeyboardInput", ({test, end}) => {
  test("KeyboardInput() throws TypeError for bad inputs", ({throws, end}) => {
    throws(() => { KeyboardInput(null) }, TypeError, "for null argument")
    throws(() => { KeyboardInput(undefined) }, TypeError, "for undefined argument")
    throws(() => { KeyboardInput(0) }, TypeError, "for number argument")
    throws(() => { KeyboardInput(true) }, TypeError, "for boolean argument")
    throws(() => { KeyboardInput([]) }, TypeError, "for array argument")
    end()
  })

  test("KeyboardInput() returns a function for correct input", ({pass, end}) => {
    pass('function' == typeof KeyboardInput(ctx))
    end()
  })

  end()
})

test('MouseInput', ({test, end}) => {
  test("MouseInput() throws TypeError for bad inputs", ({throws, end}) => {
    throws(() => { MouseInput(null) }, TypeError, "for null argument")
    throws(() => { MouseInput(undefined) }, TypeError, "for undefined argument")
    throws(() => { MouseInput(0) }, TypeError, "for number argument")
    throws(() => { MouseInput(true) }, TypeError, "for boolean argument")
    throws(() => { MouseInput([]) }, TypeError, "for array argument")
    end()
  })

  test("MouseInput() returns a function for correct input", ({pass, end}) => {
    pass('function' == typeof MouseInput(ctx))
    end()
  })

  end()
})

test('TouchInput', ({test, end}) => {
  test("KeyboardInput() throws TypeError for bad inputs", ({throws, end}) => {
    throws(() => { TouchInput(null) }, TypeError, "for null argument")
    throws(() => { TouchInput(undefined) }, TypeError, "for undefined argument")
    throws(() => { TouchInput(0) }, TypeError, "for number argument")
    throws(() => { TouchInput(true) }, TypeError, "for boolean argument")
    throws(() => { TouchInput([]) }, TypeError, "for array argument")
    end()
  })

  test("TouchInput() returns a function for correct input", ({pass, end}) => {
    pass('function' == typeof TouchInput(ctx))
    end()
  })

  end()
})
