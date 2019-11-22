import { stringify } from './utils/stringify'
import { UnitResponseContext } from './UnitResponseContext'

describe('UnitResponseResolver', () => {
  it('Exposes the result variable via a dynamic `result` property', () => {
    expect(stringify(new UnitResponseContext().result.items)).toEqual('$context.result.items')
  })
})
