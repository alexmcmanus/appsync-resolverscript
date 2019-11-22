import { stringify } from './utils/stringify'
import { UnitRequestContext } from './UnitRequestContext'

describe('UnitRequestResolver', () => {
  it('Exposes the graphQL arguments variable via a dynamic `args` property', () => {
    expect(stringify(new UnitRequestContext().args.id)).toEqual('$context.args.id')
  })
})
