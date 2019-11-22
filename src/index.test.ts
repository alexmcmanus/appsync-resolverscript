import { sendAppSyncRequest } from './index'

describe('index', () => {
  it('sendAppSyncRequest() returns an ResolverTemplateBuilder configured for requests and responses', () => {
    const template = sendAppSyncRequest(velocityContext => velocityContext.context.args.id).then(
      velocityContext => velocityContext.context.result
    )
    expect(template.requestTemplate).toEqual('$context.args.id')
    expect(template.responseTemplate).toEqual('$context.result')
  })
})
