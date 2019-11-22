import { AppSyncVelocityContext } from './AppSyncVelocityContext'
import { UnitRequestContext } from './UnitRequestContext'

describe('AppSyncVelocityContext', () => {
  it('The context exposes the $util functions', () => {
    const context = new AppSyncVelocityContext(new UnitRequestContext())
    expect(context.util).toBeDefined()
  })

  it('The context exposes the $context object', () => {
    const context = new AppSyncVelocityContext(new UnitRequestContext())
    expect(context.context).toBeDefined()
  })
})
