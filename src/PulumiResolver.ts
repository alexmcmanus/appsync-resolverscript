import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as appsync from '@pulumi/aws/appsync'
import { ResolverTemplateBuilder } from './ResolverTemplateBuilder'

interface NewResolverArgs {
  readonly apiId: pulumi.Input<string>
  readonly dataSource?: pulumi.Input<string>
  readonly field: pulumi.Input<string>
  readonly kind?: pulumi.Input<string>
  readonly pipelineConfig?: pulumi.Input<aws.types.input.appsync.ResolverPipelineConfig>
  readonly template: ResolverTemplateBuilder
  readonly type: pulumi.Input<string>
}

const convertArgs = (args: NewResolverArgs): appsync.ResolverArgs => {
  const oldArgs = {
    ...args,
    requestTemplate: args.template.requestTemplate,
    responseTemplate: args.template.responseTemplate
  }
  delete oldArgs.template
  return oldArgs
}

export class PulumiResolver extends appsync.Resolver {
  constructor (name: string, args: NewResolverArgs, opts?: pulumi.CustomResourceOptions) {
    super(name, convertArgs(args), opts)
  }
}
