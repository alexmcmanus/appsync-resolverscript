import { getItem } from './dynamodb'
import { vtl } from '../VelocityFragment'
import { stringify } from '../utils/stringify'

describe('dynamodb', () => {
  describe('getItem()', () => {
    it('renders a single-value key structure as DynamoDB-JSON', () => {
      const fragment = getItem({ id: 'cheese' })
      expect(stringify(fragment, 2)).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":"cheese"})
}`
      )
    })

    it('renders a double-value key structure as JSON', () => {
      const fragment = getItem({ id: 'cheese', biscuit: true })
      expect(stringify(fragment, 2)).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":"cheese","biscuit":true})
}`
      )
    })

    it('renders a key structure returned by a function', () => {
      const fragment = getItem(({ context }) => ({ id: context.args.id }))
      expect(stringify(fragment, 2)).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":$context.args.id})
}`
      )
    })

    it('throws an error if no key values are provided', () => {
      expect(() => getItem({})).toThrow('`key` must define at least one typed value')
    })

    it('throws an error if more than two key values are provided', () => {
      expect(() => getItem({ id: 'cheese', biscuit: true, tooMany: 3 })).toThrow(
        '`key` must define no more than two typed values'
      )
    })

    it('renders a key structure with Velocity variable references', () => {
      const fragment = getItem({ id: vtl`$context.args.id` })
      expect(stringify(fragment, 2)).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":$context.args.id})
}`
      )
    })
  })
})
