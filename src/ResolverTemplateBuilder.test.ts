import { ResolverTemplateBuilder } from './ResolverTemplateBuilder'
import { VelocityFragment, vtl } from './VelocityFragment'
import { AppSyncVelocityContext } from './AppSyncVelocityContext'
import { VelocityContext } from './VelocityContext'
import { UnitRequestContext } from './UnitRequestContext'
import { UnitResponseContext } from './UnitResponseContext'

describe('ResolverTemplateBuilder', () => {
  it('If a builder has no request template set, it defaults to using an empty JSON object', () => {
    const builder = new ResolverTemplateBuilder(new VelocityContext(), new VelocityContext())
    expect(builder.requestTemplate).toEqual('{}')
  })

  it('If a builder has no response template set, it defaults to using JSON-encoding $context.result', () => {
    const builder = new ResolverTemplateBuilder(new VelocityContext(), new VelocityContext())
    expect(builder.responseTemplate).toEqual('$util.toJson($context.result)')
  })

  it('If a builder has an object template set, the JSON-encoded value is used', () => {
    const builder = new ResolverTemplateBuilder(new VelocityContext(), new VelocityContext())
    builder.sendRequest({ request: true }).then({ response: false })
    expect(builder.requestTemplate).toEqual('{\n  "request": true\n}')
    expect(builder.responseTemplate).toEqual('{\n  "response": false\n}')
  })

  it('If a builder has a VelocityFragment set, the string value is used without JSON-encoding', () => {
    const builder = new ResolverTemplateBuilder(new VelocityContext(), new VelocityContext())
    builder.sendRequest(new VelocityFragment('true')).then(new VelocityFragment('false'))
    expect(builder.requestTemplate).toEqual('true')
    expect(builder.responseTemplate).toEqual('false')
  })

  it('If a builder has a function template set, the returned value is JSON-encoded', () => {
    const builder = new ResolverTemplateBuilder(new VelocityContext(), new VelocityContext())
    builder.sendRequest(() => 'true').then(() => false)
    expect(builder.requestTemplate).toEqual('"true"')
    expect(builder.responseTemplate).toEqual('false')
  })

  it('If a builder has a function template set, it can access request and response properties', () => {
    const builder = new ResolverTemplateBuilder(
      new AppSyncVelocityContext(new UnitRequestContext()),
      new AppSyncVelocityContext(new UnitResponseContext())
    )
    builder
      .sendRequest(velocityTemplate => velocityTemplate.util.toJson(velocityTemplate.context.args.id))
      .then(velocityTemplate => velocityTemplate.util.toJson(velocityTemplate.context.result))
    expect(builder.requestTemplate).toEqual('$util.toJson($context.args.id)')
    expect(builder.responseTemplate).toEqual('$util.toJson($context.result)')
  })
})
