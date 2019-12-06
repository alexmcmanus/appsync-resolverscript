import { AppSyncContext } from './AppSyncContext'
import { stringify } from './utils/stringify'

describe('AppSyncContext', () => {
  it('Exposes the graphQL arguments variable via a dynamic `args` property', () => {
    expect(stringify(new AppSyncContext().args.id)).toEqual('$context.args.id')
  })

  it('Exposes the result variable via a dynamic `result` property', () => {
    expect(stringify(new AppSyncContext().result.items)).toEqual('$context.result.items')
  })

  it('Exposes the auth data via an `identity` property', () => {
    expect(stringify(new AppSyncContext().identity.username)).toEqual('$context.identity.username')
  })
})
