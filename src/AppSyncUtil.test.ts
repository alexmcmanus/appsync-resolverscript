import { AppSyncUtil } from './AppSyncUtil'
import { VelocityFragment } from './VelocityFragment'
import { stringify } from './utils/stringify'

describe('AppSyncUtil', () => {
  it('toJson() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const util = new AppSyncUtil()
    const result = util.toJson('cheese')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.toJson("cheese")')
  })
})
