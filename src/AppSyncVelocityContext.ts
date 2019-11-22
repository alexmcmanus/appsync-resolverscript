import { VelocityContext } from './VelocityContext'
import { AppSyncUtil } from './AppSyncUtil'

export class AppSyncVelocityContext<ContextType> extends VelocityContext {
  readonly context: ContextType
  readonly util = new AppSyncUtil()

  constructor (context: ContextType) {
    super()
    this.context = context
  }
}
