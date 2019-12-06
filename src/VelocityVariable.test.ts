import { VelocityVariable } from './VelocityVariable'
import { stringify } from './utils/stringify'

describe('VelocityVariable', () => {
  it('A variable serializes to a Velocity variable reference via stringify()', () => {
    expect(stringify(new VelocityVariable('id'))).toEqual('$id')
  })

  it('Nested variables serialize using the fully-qualified path via stringify()', () => {
    const velocityVariable = new VelocityVariable('id', new VelocityVariable('args', new VelocityVariable('context')))
    expect(stringify(velocityVariable)).toEqual('$context.args.id')
  })
})
