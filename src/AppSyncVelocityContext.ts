import { VelocityContext } from './VelocityContext'
import { AppSyncUtil } from './AppSyncUtil'

export class AppSyncVelocityContext extends VelocityContext {
  util = new AppSyncUtil()
}
