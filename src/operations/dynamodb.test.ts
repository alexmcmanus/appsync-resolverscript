import { getItem } from './dynamodb'
import { vtl } from '../VelocityFragment'

describe('dynamodb', () => {
  describe('getItem()', () => {
    it('renders a single-value key structure as DynamoDB-JSON', () => {
      const builder = getItem({ id: 'cheese' })
      expect(builder.requestTemplate).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":"cheese"})
}`
      )
    })

    it('renders a double-value key structure as JSON', () => {
      const builder = getItem({ id: 'cheese', biscuit: true })
      expect(builder.requestTemplate).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":"cheese","biscuit":true})
}`
      )
    })

    it('renders a key structure returned by a function', () => {
      const builder = getItem(({ context }) => ({ id: context.args.id }))
      expect(builder.requestTemplate).toEqual(
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
      const builder = getItem({ id: vtl`$context.args.id` })
      expect(builder.requestTemplate).toEqual(
        `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": $util.dynamodb.toDynamoDBJson({"id":$context.args.id})
}`
      )
    })

    it('provides a default response mapping', () => {
      const builder = getItem({ id: 'cheese' })
      expect(builder.responseTemplate).toEqual('$util.toJson($context.result)')
    })

    it('the response mapping can be overridden', () => {
      const builder = getItem({ id: 'cheese' }).then('response')
      expect(builder.responseTemplate).toEqual('"response"')
    })
  })
})
