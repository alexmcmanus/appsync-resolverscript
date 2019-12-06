import { AppSyncUtil } from './AppSyncUtil'
import { UnitRequestContext } from './UnitRequestContext'
import { UnitResponseContext } from './UnitResponseContext'
import { AppSyncContext } from './AppSyncContext'

export interface VelocityContext<ContextType extends UnitRequestContext> {
  readonly context: ContextType
  readonly util: AppSyncUtil
}

export class VelocityContextImpl implements VelocityContext<UnitResponseContext> {
  readonly context = new AppSyncContext()
  readonly util = new AppSyncUtil()
}
