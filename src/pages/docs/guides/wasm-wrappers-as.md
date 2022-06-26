---
title: Creating WebAssembly wrappers
description: A guide to wrapper development.
---

In this guide, you will implement a custom Wasm wrapper.

{% callout title="Implementation languages" %}
Polywrap's first implementation language is AssemblyScript with Rust support coming soon.  
{% /callout %}

---

## Prerequisites

You'll need these dependencies installed globally own your machine before you begin:

- `nvm`
- `yarn`
- `docker`
- `docker-compose`

---

## Setting up the template project

We'll use the Wasm wrapper template project as a starting point. Run:

````shell
```shell
npx polywrap create wasm assemblyscript my-wrapper
cd my-wrapper
````

Then install dependencies with:

```shell
nvm install && nvm use && yarn
```

## Defining method types and fields

The `./src/schema.graphql` file is where we define the types that your wrappers can have and fields on those types – this file controls the data that your wrappers can take and the data it can return.

Wrappers can import the methods and types of other deployed wrappers. We will now import the IPFS plugin wrapper by writing the import statement at the top of `schema.graphql` file:

```graphql
#import { Module } into Ipfs from "wrap://ens/ipfs.polywrap.eth"
```

Add functions to get and set data to IPFS:

```graphql
type Module {
  ...

getIpfsData(
    address: String!
    connection: Ethereum_Connection
  ): String!

setIpfsData(
    options: SetIpfsDataOptions!
    connection: Ethereum_Connection
  ): SetIpfsDataResult!
}

type SetIpfsDataOptions {
  address: String!
  data: String!
}

type SetIpfsDataResult {
  ipfsHash: String!
  txReceipt: String!
}
```

## Implementing wrapper functions

In the `./src/index.ts` file, import the new types we've defined:

```ts
import {
	...

  Ipfs_Module,
  Input_getIpfsData,
  Input_setIpfsData,
  SetIpfsDataResult,
} from './wrap';
```

Then implement the `setIpfsData` method:

```ts
export function setIpfsData(input: Input_setIpfsData): SetIpfsDataResult {
  // 1. Upload the data to IPFS
  const ipfsHash = Ipfs_Module.addFile({
    data: String.UTF8.encode(input.options.data),
  })

  // 2. Add the data's IPFS hash to SimpleStorage using `setHash(...)`
  const txReceipt = Ethereum_Module.callContractMethodAndWait({
    address: input.options.address,
    method: 'function setHash(string value)',
    args: [ipfsHash],
    connection: input.connection,
  })

  // 3. Return the result
  return {
    ipfsHash,
    txReceipt: txReceipt.transactionHash,
  }
}
```

And also the `getIpfsData` method:

```ts
export function getIpfsData(input: Input_getIpfsData): string {
  const hash = Ethereum_Module.callContractView({
    address: input.address,
    method: 'function getHash() view returns (string)',
    args: [],
    connection: input.connection,
  })

  return String.UTF8.decode(Ipfs_Module.catFile({ cid: hash }))
}
```

Run `yarn build` to confirm that this file can build successfully.
