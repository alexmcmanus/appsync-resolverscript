export enum AnyType {
  'ANY'
}

export enum VoidType {
  'VOID'
}

type VelocityType<T> = { _velocityType: T[] | AnyType[] } | T

export type VelocityString = VelocityType<string>
export type VelocityBoolean = VelocityType<boolean>
export type VelocityObject = VelocityType<object | string>
