import { AppSyncUtil } from './AppSyncUtil'
import { VelocityFragment, vtl } from './VelocityFragment'
import { stringify } from './utils/stringify'
import { DynamoDB } from './DynamoDB'

import { context } from './index'
import { VelocityString } from './velocity-types'
import { VelocityMap } from './VelocityMap'

describe('AppSyncUtil', () => {
  it('dynamodb provides access to DynamoDB functions', () => {
    const util = new AppSyncUtil()
    expect(util.dynamodb).toBeInstanceOf(DynamoDB)
  })

  it('toJson() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const util = new AppSyncUtil()
    const result = util.toJson('cheese')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.toJson("cheese")')
  })

  it('isList() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const util = new AppSyncUtil()
    const result = util.isList([])
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.isList([])')
  })

  it('isString() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const util = new AppSyncUtil()
    const result = util.isString('cheese')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.isString("cheese")')
  })

  it('isNull() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const util = new AppSyncUtil()
    const result = util.isNull('test')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.isNull("test")')
  })

  it('isNullOrEmpty() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const util = new AppSyncUtil()
    const result = util.isNullOrEmpty('')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.isNullOrEmpty("")')
  })

  it('defaultIfNull() returns a fragment for the Velocity function call with the parameters stringified', () => {
    const util = new AppSyncUtil()
    const result = util.defaultIfNull(vtl`$context.args.id`, 'cheese')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.defaultIfNull($context.args.id, "cheese")')
  })

  it('unauthorized() returns a fragment for the Velocity function call', () => {
    const util = new AppSyncUtil()
    const result = util.unauthorized()
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.unauthorized()')
  })
})
