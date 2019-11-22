import { VelocityVariable, createVelocityVariable } from './VelocityVariable'
import { stringify } from './utils/stringify'

describe('VelocityVariable', () => {
  it('A variable serializes to a Velocity variable reference via stringify()', () => {
    expect(stringify(new VelocityVariable(['context', 'args', 'id']))).toEqual('$context.args.id')
  })

  it('A variable gives dynamic access to nested properties', () => {
    const velocityVariable = createVelocityVariable('context')
    const nestedProp = velocityVariable.args.id
    expect(nestedProp).toBeInstanceOf(VelocityVariable)
    expect(stringify(nestedProp)).toEqual('$context.args.id')
  })
})
