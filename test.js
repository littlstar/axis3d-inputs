const { Keyboard, Mouse, Touch } = require('./')
const { Context } = require('axis3d')
const test = require('tape')
const ctx = new Context()

test("Keyboard", ({test, end}) => {
  test("Keyboard() throws TypeError for bad inputs", ({throws, end}) => {
    throws(() => { Keyboard(null) }, TypeError, "for null argument")
    throws(() => { Keyboard(undefined) }, TypeError, "for undefined argument")
    throws(() => { Keyboard(0) }, TypeError, "for number argument")
    throws(() => { Keyboard(true) }, TypeError, "for boolean argument")
    throws(() => { Keyboard([]) }, TypeError, "for array argument")
    end()
  })

  test("Keyboard() returns a function for correct input", ({pass, end}) => {
    pass('function' == typeof Keyboard(ctx))
    end()
  })

  end()
})

test('Mouse', ({test, end}) => {
  test("Mouse() throws TypeError for bad inputs", ({throws, end}) => {
    throws(() => { Mouse(null) }, TypeError, "for null argument")
    throws(() => { Mouse(undefined) }, TypeError, "for undefined argument")
    throws(() => { Mouse(0) }, TypeError, "for number argument")
    throws(() => { Mouse(true) }, TypeError, "for boolean argument")
    throws(() => { Mouse([]) }, TypeError, "for array argument")
    end()
  })

  test("Mouse() returns a function for correct input", ({pass, end}) => {
    pass('function' == typeof Mouse(ctx))
    end()
  })

  end()
})

test('Touch', ({test, end}) => {
  test("Keyboard() throws TypeError for bad inputs", ({throws, end}) => {
    throws(() => { Touch(null) }, TypeError, "for null argument")
    throws(() => { Touch(undefined) }, TypeError, "for undefined argument")
    throws(() => { Touch(0) }, TypeError, "for number argument")
    throws(() => { Touch(true) }, TypeError, "for boolean argument")
    throws(() => { Touch([]) }, TypeError, "for array argument")
    end()
  })

  test("Touch() returns a function for correct input", ({pass, end}) => {
    pass('function' == typeof Touch(ctx))
    end()
  })

  end()
})
