import { UnitRequestContext } from './UnitRequestContext'
import { VelocityMap } from './VelocityMap'
import { IdentityBase } from './Identity'

export interface UnitResponseContext<
  IdentityType extends IdentityBase = IdentityBase,
  ArgsType extends VelocityMap = VelocityMap,
  ResultsType extends VelocityMap = VelocityMap
> extends UnitRequestContext<IdentityType, ArgsType> {
  readonly result: ResultsType
}
