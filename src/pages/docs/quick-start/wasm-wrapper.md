---
title: Template Wasm wrapper
description: A guide to the template Wasm wrapper.
---

This is a guide on WebAssembly (Wasm) wrapper development, from writing your wrapper to deploying it to decentralized storage.

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

## Setting up the template

To set up a sample project, run:

```shell
npx polywrap create wasm assemblyscript my-wrapper
cd my-wrapper
```

Then install dependencies with:

```shell
nvm install && nvm use && yarn
```

---

## Project files

Inside the `src/` folder are two files that you'll be working on most:

- `index.ts`: Wrapper implementation
- `schema.graphql`: Wrapper types

---

## Build, deploy and test (template project)

In this section, we will:

- Build the template wrapper which can `getData` from our smart contract
- Build a `simpleStorage` contract that can `get` and `set` data
- Deploy them to a local IPFS node and Ethereum node, respectively
- Run an end-to-end test to confirm that the wrapper `getData` from the contract

### Building wrapper and sample smart contract

To build the wrapper, run:

```shell
yarn build
```

This will output it in the `./build/*` folder and also build the sample smart contract that your wrapper will interact with.

### Setting up a local test environment and deploying

You will now deploy your wrapper and smart contract to a local test environment.

{% callout type="warning" title="Run Docker daemon" %}
For this next section, you'll need to have Docker running. A simple start is to use [Docker Desktop](https://www.docker.com/products/docker-desktop/).
{% /callout %}

To stand up a local Ethereum and IPFS node, run:

```shell
yarn test:env:up
```

Next, deploy the wrapper and smart contract:

```shell
yarn deploy
```

Run the test and view test results in your output window:

```shell
yarn test:e2e
```
