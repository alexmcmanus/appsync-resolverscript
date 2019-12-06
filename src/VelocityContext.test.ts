import { VelocityContext } from './VelocityContext'
import { AppSyncContext } from './AppSyncContext'

describe('VelocityContext', () => {
  it('The context exposes the $util functions', () => {
    const context = new VelocityContext(new AppSyncContext())
    expect(context.util).toBeDefined()
  })

  it('The context exposes the $context object', () => {
    const context = new VelocityContext(new AppSyncContext())
    expect(context.context).toBeDefined()
  })
})
