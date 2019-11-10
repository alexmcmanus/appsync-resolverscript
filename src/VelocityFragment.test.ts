import { VelocityFragment, vtl } from './VelocityFragment'
import { stringify } from './utils/stringify'

describe('VelocityFragment', () => {
  it('An instance of VelocityFragment is serialized without JSON encoding', () => {
    expect(
      stringify(
        {
          one: 'one',
          two: new VelocityFragment('$two')
        },
        2
      )
    ).toEqual('{\n  "one": "one",\n  "two": $two\n}')
  })

  it('The vtl template literal returns an instance of VelocityFragment containing the string', () => {
    expect(vtl`$test`).toEqual(new VelocityFragment('$test'))
  })

  it('The vtl template literal resolves expressions', () => {
    const one = '$one'
    const two = '$two'
    expect(vtl`$test(${one}, ${two})`).toEqual(new VelocityFragment('$test($one, $two)'))
  })
})
