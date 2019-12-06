import { AppSyncUtil } from './AppSyncUtil'
import { UnitRequestContext } from './UnitRequestContext'

export class VelocityContext<ContextType extends UnitRequestContext> {
  readonly context: ContextType
  readonly util = new AppSyncUtil()

  constructor (context: ContextType) {
    this.context = context
  }
}
