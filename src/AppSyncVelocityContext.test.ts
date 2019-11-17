import { AppSyncVelocityContext } from './AppSyncVelocityContext'

describe('AppSyncVelocityContext', () => {
  it('The context exposes the $util functions', () => {
    const context = new AppSyncVelocityContext()
    expect(context.util).toBeDefined()
  })
})
