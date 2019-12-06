import { VelocityVariable } from './VelocityVariable'
import { createVelocityMap, VelocityMap } from './VelocityMap'

export interface IdentityBase {
  username: VelocityVariable<string>
  sourceIp: VelocityVariable<string[]>
}

export interface IamIdentity extends IdentityBase {
  accountId: VelocityVariable<string>
  cognitoIdentityPoolId: VelocityVariable<string>
  cognitoIdentityId: VelocityVariable<string>
  userArn: VelocityVariable<string>
  cognitoIdentityAuthType: VelocityVariable<string>
  cognitoIdentityAuthProvider: VelocityVariable<string>
}

export interface CognitoIdentity extends IdentityBase {
  sub: VelocityVariable<string>
  issuer: VelocityVariable<string>
  claims: VelocityMap
  defaultAuthStrategy: VelocityVariable<string>
}

export class Identity extends VelocityVariable<object> implements IamIdentity, CognitoIdentity {
  username: VelocityVariable<string>
  sourceIp: VelocityVariable<string[]>

  accountId: VelocityVariable<string>
  cognitoIdentityPoolId: VelocityVariable<string>
  cognitoIdentityId: VelocityVariable<string>
  userArn: VelocityVariable<string>
  cognitoIdentityAuthType: VelocityVariable<string>
  cognitoIdentityAuthProvider: VelocityVariable<string>

  sub: VelocityVariable<string>
  issuer: VelocityVariable<string>
  claims: VelocityMap
  defaultAuthStrategy: VelocityVariable<string>

  constructor (parent: VelocityVariable<unknown>) {
    super('identity', parent)
    this.accountId = new VelocityVariable<string>('accountId', this)
    this.cognitoIdentityPoolId = new VelocityVariable<string>('cognitoIdentityPoolId', this)
    this.cognitoIdentityId = new VelocityVariable<string>('cognitoIdentityId', this)
    this.sourceIp = new VelocityVariable<string[]>('sourceIp', this)
    this.username = new VelocityVariable<string>('username', this)
    this.userArn = new VelocityVariable<string>('userArn', this)
    this.cognitoIdentityAuthType = new VelocityVariable<string>('cognitoIdentityAuthType', this)
    this.cognitoIdentityAuthProvider = new VelocityVariable<string>('cognitoIdentityAuthProvider', this)
    this.sub = new VelocityVariable<string>('sub', this)
    this.issuer = new VelocityVariable<string>('issuer', this)
    this.claims = createVelocityMap('claims', this)
    this.defaultAuthStrategy = new VelocityVariable<string>('defaultAuthStrategy', this)
  }
}
