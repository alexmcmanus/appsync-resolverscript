import { VelocityFragment, vtl } from './VelocityFragment'
import { stringify } from './utils/stringify'

export class DynamoDB {
  toDynamoDBJson = (value: unknown): VelocityFragment => {
    return vtl`$util.dynamodb.toDynamoDBJson(${stringify(value)})`
  }
}
