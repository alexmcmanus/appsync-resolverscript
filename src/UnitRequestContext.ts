import { IdentityBase } from './Identity'
import { VelocityMap } from './VelocityMap'

export interface UnitRequestContext<
  IdentityType extends IdentityBase = IdentityBase,
  ArgsType extends VelocityMap = VelocityMap
> {
  readonly args: ArgsType
  readonly identity: IdentityType
}
