# appsync-resolverscript

Typed JavaScript abstraction for AWS AppSync resolver templates, supporting AWS CDK and Pulumi.

[![Build Status](https://travis-ci.org/alexmcmanus/appsync-resolverscript.svg?branch=master)](https://travis-ci.org/alexmcmanus/appsync-resolverscript)
[![codecov](https://codecov.io/gh/alexmcmanus/appsync-resolverscript/branch/master/graph/badge.svg)](https://codecov.io/gh/alexmcmanus/appsync-resolverscript)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code-of-conduct.md)

```js
import { PulumiResolver, sendAppSyncRequest, operations, context } from 'appsync-resolverscript'

new PulumiResolver('getUserResolver', {
  apiId: horselingApi.id,
  dataSource: databaseDataSource.name,
  type: 'Query',
  field: 'getUser',
  template: sendAppSyncRequest(operations.dynamodb.getItem({ id: context.args.id }))
})
```

- Declare AWS AppSync resolver Velocity templates in JavaScript or TypeScript.
- Use type-checked JavaScript rather than VTL.
- Publish patterns as NPM packages and re-use them.
- Works with [AWS CDK](https://aws.amazon.com/cdk/) and [Pulumi](https://www.pulumi.com/).

#### More Examples

```js
import { sendAppSyncRequest, operations } from 'appsync-resolverscript'

const templateBuilder = operations.dynamodb.getItem(({ context }) => ({ id: context.args.id }))
const { requestTemplate, responseTemplate } = templateBuilder
```

...is equivalent to...

```js
import { sendAppSyncRequest, vtl } from 'appsync-resolverscript'

const templateBuilder = sendAppSyncRequest(({ context, util }) => ({
  operation: 'GetItem',
  version: '2017-02-28',
  key: {
    id: util.dynamodb.toDynamoDBJson(context.args.id)
  }
})).then(({ context, util }) => util.toJson(context.result))
const { requestTemplate, responseTemplate } = templateBuilder
```

...is equivalent to...

```js
import { sendAppSyncRequest, vtl } from 'appsync-resolverscript'

const templateBuilder = sendAppSyncRequest({
  operation: 'GetItem',
  version: '2017-02-28',
  key: {
    id: vtl`$util.dynamodb.toDynamoDBJson($context.args.id)`
  }
}).then(vtl`$util.toJson($context.result)`)
const { requestTemplate, responseTemplate } = templateBuilder
```

...is equivalent to...

```js
const requestTemplate = `{
  "operation": "GetItem",
  "version": "2017-02-28",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($context.args.id)
  }
}`
const responseTemplate = '$util.toJson($context.result)'
```

## Installation

With Yarn:

```
$ yarn add --dev appsync-resolverscript
```

Or NPM:

```
$ npm install appsync-resolverscript --save-dev
```

## Usage

### Define the Request Template

Use the `sendAppSyncRequest(request)` function to define the request template. E.g.

```js
// Defines: {}
const templateBuilder = sendAppSyncRequest({})
```

`request` can be a primitive or object that will be stringified, a Velocity fragment, or a
function that returns any of the above. Multiple arguments are concatenated. It returns a
builder object that can be used to chain the response template.

Note that if you return a raw string as your template definition, it will be stringified to JSON. E.g.

```js
// Defines: "#return"
sendAppSyncRequest('#return')
```

### Define the Response Template

From the builder returned by the request, use the `then(response)` function to define the response
template, in the same way as the request. Again, the builder is returned for further function
chaining. E.g.

```js
// Defines: {}
templateBuilder.then({})
```

Defining a response is optional, as it defaults to:

```vtl
$util.toJson($context.result)
```

### Velocity Fragments

For any value in the request or response definition, you can suspend JSON stringification and
provide raw VTL markup by using the `vtl` template literal. E.g.

```js
// Defines: #return
sendAppSyncRequest(vtl`#return`)
```

Alternatively, use an instance of `VelocityFragment`.

You can jump back into JSON by embedding the `stringify()` method, but make sure you use the one
from this package - it handles fragments, functions and variables correctly. E.g.

```js
// Defines: #set( $person = { "name": "Bob" })
sendAppSyncRequest(vtl`#set( $person = ${stringify({ name: 'Bob' })})`)
```

### Function Templates

The request or response templates can be defined using a function that returns the template structure.
This function gets passed the Velocity context as a parameter, providing access to variables and
functions. You can implement any logic you like in the function, but remember, any JavaScript
conditional logic or loops are executed at deploy time, not when the template is executed - the
template definition is the value returned by the function. E.g.

```js
// If useKey === true, defines  : $context.args.key
// If useKey === false, defines : { "id": $context.args.id }
sendAppSyncRequest(() => {
  const useKey = // ... get from somewhere.
  if (useKey) {
    return vtl`$context.args.key`
  } else {
    return {
      id: vtl`$context.args.id`
    }
  }
})
```

### AppSync Functions

All of the standard AppSync functions are available via the Velocity context passed to function
templates (\* this is still WIP). Parameters passed to AppSync functions are stringified to JSON. E.g.

```js
// Defines: $context.util.toJson(1, "two")
sendAppSyncRequest(velocityContext => velocityContext.util.toJson(1, 'two'))
```

You may want to use object-destructuring on the `velocityContext` parameter to make this a little
less verbose, especially if you are calling functions in many places:

```js
// Defines: '$context.util.toJson(1, "two")'
sendAppSyncRequest(({ util }) => util.toJson(1, 'two'))
```

AppSync functions can also be imported at module scope, which allows you avoid the boilerplate
of defining your request or response as a function:

```js
import { sendAppSyncRequest, util } from 'appsync-resolverscript'

// Defines: '$context.util.toJson(1, "two")'
sendAppSyncRequest(util.toJson(1, 'two'))
```

### AppSync Context Variables

The standard AppSync context object is available as a `context` property on the Velocity context passed
to function templates (\* this is still WIP). Sorry, overloading the term context is a bit confusing. E.g.

```js
// Defines: { "id": $context.args.id }
sendAppSyncRequest(velocityContext => {
  id: velocityContext.context.args.id
})
```

or

```js
// Defines: { "id": $context.args.id }
sendAppSyncRequest(({ context }) => ({ id: context.args.id }))
```

Once you get to an args value or result, you can navigate through to any sub-properties (although
the sub-properties are not type-checked, as the TypeScript doesn't know the shape of your args or results). E.g.

```js
// Defines: { "id": $context.args.id }
then(({ context, util }) => util.toJson(context.result.items))
```

Note that the `ctx` abbreviation is not supported.

The AppSync context object can also be imported at module scope, The downside of this approach is
that the context object is a superset of request, response and pipeline function contexts, and so not
all properties are appropriate for all mapping types (e.g. `context.result` could be mis-used in a
request). The advantage is that it allows you avoid the boilerplate of defining your request
or response as a function. E.g.

```js
import { sendAppSyncRequest, context } from 'appsync-resolverscript'

// Defines: { "id": $context.args.id }
sendAppSyncRequest({ id: context.args.id })
```

### Velocity Types

If you are working in Typescript, AppSync function parameters and return values are typed.
So too are the non-dynamic properties from the Velocity context. E.g.

```ts
// Typescript errors:
// - defaultIfNullOrEmpty(string, string)
// - $context.identity.claims is an object
// - false is a boolean
sendAppSyncRequest(util.defaultIfNullOrEmpty(context.identity.claims, false))
```

The default type of a Velocity fragment is `AnyType`, which matches any other type. This means that
you don't have to worry about the type of any fragments, although you can choose to type them if
you want to enable the type-checking. E.g.

```ts
// Typescript errors:
// - defaultIfNullOrEmpty(string, string)
// - $context.identity.claims is an object
sendAppSyncRequest(util.defaultIfNullOrEmpty(vtl<object>`$context.identity.claims`, '[]'))
```

### Get the VTL Markup

The builder returned by `sendAppSyncRequest(request)` has `requestTemplate` and `responseTemplate`
properties to get the declared request and response mapping template as Velocity Template Language
markup. E.g.

```js
const templateBuilder = sendAppSyncRequest('myRequest').then('myResponse')
assert.deepEqual('"myRequest"', templateBuilder.requestTemplate)
assert.deepEqual('"myResponse"', templateBuilder.responseTemplate)
```

Note: you don't generally need to use these properties if you use the CDK or Pulumi-specific classes.

## Operations

Higher-level abstractions of the AppSync operations are available under `operations`. They all
accept functions and VTL markup, and return a mapping definition that can be used in
`sendAppSyncRequest()`.

### DynamoDB

GetItem:

```js
const templateBuilder = sentAppSyncRequest(operations.dynamodb.getItem({ id: context.args.id }))
```

## Pulumi

Pulumi is supported via the `PulumiResolver` class. It has the same usage as `aws.appsync.Resolver`, but the
`requestTemplate` and `responseTemplate` properties are replaced with `template: ResolverTemplateBuilder`, and
can be used as follows:

```ts
new PulumiResolver('getUserResolver', {
  apiId: horselingApi.id,
  dataSource: databaseDataSource.name,
  type: 'Query',
  field: 'getUser',
  template: sendAppSyncRequest(operations.dynamodb.getItem({ id: context.args.id }))
})
```

## Roadmap

- Add typing to fragments and `util` functions.
- Add typing where possible to the appsync context.
- Pre-populate Velocity variables for Unit and Pipeline templates.
- Add ability to set Velocity variables.
- Complete mapping of all core `util` functions.
- Complete mapping of all `dynamodb` functions.
- Add higher-level abstractions for DynamoDB API.
- Support `sendRequest().catch()`.
- Support `map()` and `filter()` on variables.
- Add explicit support for pipeline resolvers.
- Review namespacing of modules - don't import everything at root.
- Add explicit support for AWS CDK.
- Explore using JSX to build more complex templates from components.
- Add examples.

## Contributions

Contributions with unit tests are welcome, but please raise an issue and get feedback before spending any
significant effort.
