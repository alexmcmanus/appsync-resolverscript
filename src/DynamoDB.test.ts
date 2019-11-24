import { stringify } from './utils/stringify'
import { DynamoDB } from './DynamoDB'
import { VelocityFragment } from './VelocityFragment'

describe('DynamoDB', () => {
  it('toDynamoDBJson() returns a fragment for the Velocity function call with the parameter stringified', () => {
    const dynamodb = new DynamoDB()
    const result = dynamodb.toDynamoDBJson('cheese')
    expect(result).toBeInstanceOf(VelocityFragment)
    expect(stringify(result)).toEqual('$util.dynamodb.toDynamoDBJson("cheese")')
  })
})
