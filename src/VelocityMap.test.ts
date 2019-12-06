import { createVelocityMap } from './VelocityMap'
import { stringify } from './utils/stringify'
import { VelocityVariable } from './VelocityVariable'
import { AnyType } from './velocity-types'

describe('VelocityMap', () => {
  const expectAnyVelocityVariable = (actual: VelocityVariable<AnyType>): void =>
    expect(actual).toBeInstanceOf(VelocityVariable)

  it('A map serializes to a Velocity variable reference via stringify()', () => {
    expect(stringify(createVelocityMap('id'))).toEqual('$id')
  })

  it('A map gives dynamic access to nested properties with a type of any', () => {
    const velocityMap = createVelocityMap('context')
    const nestedProp = velocityMap.args.id
    expectAnyVelocityVariable(nestedProp)
    expect(stringify(nestedProp)).toEqual('$context.args.id')
  })
})
