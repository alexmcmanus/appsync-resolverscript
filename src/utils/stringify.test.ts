// Derived from this Gist from Andrew Burgess: https://gist.github.com/andrew8088/6f53af9579266d5c62c8
// Permission granted via email, 2019/11/05.

import { stringify } from './stringify'

describe('stringify', function () {
  class TestBypass {
    bypassJSON (): string {
      return 'wibble'
    }
  }

  const assertMatches = (value: unknown, indent?: number) => {
    return () => {
      const actual = stringify(value, indent)
      const expected = JSON.stringify(value, undefined, indent)
      expect(actual).toEqual(expected)
    }
  }

  it('undefined', assertMatches(undefined))
  it('string', assertMatches('andrew'))
  it('string with special chars', assertMatches('this"is a \\test'))
  it('number', assertMatches(10))
  it('true', assertMatches(true))
  it('false', assertMatches(false))
  it('null', assertMatches(null))
  it('array', assertMatches(['one', 'two', undefined, 1, { name: 'andrew' }]))
  it('empty object', assertMatches({}))
  it('string prop', assertMatches({ name: 'andrew' }))
  it('number prop', assertMatches({ name: 'andrew', age: 24 }))
  it('boolean prop', assertMatches({ name: 'andrew', age: 24, married: false, single: true }))
  it('date prop', assertMatches({ name: 'andrew', age: 24, married: false, single: true, date: new Date() }))
  it('array prop of strings', assertMatches({ array: ['one', 'two'] }))
  it('array prop of differing values', assertMatches({ array: ['one', 2, false, null, { value: 'five', or: 2 }] }))
  it('null prop', assertMatches({ array: ['one', 'two'], nothing: null }))
  it(
    'object prop',
    assertMatches({
      name: 'andrew',
      address: { streetAddress: '21st street', city: 'New York', state: 'NY' }
    })
  )
  it(
    'functions',
    assertMatches({
      name: 'andrew',
      doSomething: function () {
        /* Empty */
      }
    })
  )
  it(
    'functions in array property',
    assertMatches({
      name: 'andrew',
      doSomething: [
        function () {
          /* Empty */
        }
      ]
    })
  )

  it('handles circular references', () => {
    interface TestCirc {
      name: string
      relatedTo?: TestCirc
    }
    const first: TestCirc = {
      name: 'first'
    }
    const second: TestCirc = {
      name: 'second',
      relatedTo: first
    }
    first.relatedTo = second
    expect(() => stringify(first)).toThrow('Converting circular structure to JSON')
  })

  it('supports bypassJSON', () => {
    expect(stringify(new TestBypass())).toEqual('wibble')
  })

  it('string with indent', assertMatches('andrew', 2))
  it('object with indent', assertMatches({ name: 'andrew', age: 24, married: false, single: true }, 2))
  it('array with indent', assertMatches({ array: ['one', 2, false, null, { value: 'five', or: 2 }] }, 2))
})
