import { sendAppSyncRequest } from './index'

describe('index', () => {
  it('sendAppSyncRequest() returns an AppSync ResolverTemplateBuilder', () => {
    const template = sendAppSyncRequest(velocityContext => velocityContext.util.toJson('request')).then(
      velocityContext => velocityContext.util.toJson('response')
    )
    expect(template.requestTemplate).toEqual('$util.toJson("request")')
    expect(template.responseTemplate).toEqual('$util.toJson("response")')
  })
})
