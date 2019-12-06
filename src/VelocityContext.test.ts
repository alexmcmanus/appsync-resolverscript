import { VelocityContextImpl } from './VelocityContext'

describe('VelocityContextImpl', () => {
  it('The context exposes the $util functions', () => {
    const context = new VelocityContextImpl()
    expect(context.util).toBeDefined()
  })

  it('The context exposes the $context object', () => {
    const context = new VelocityContextImpl()
    expect(context.context).toBeDefined()
  })
})
