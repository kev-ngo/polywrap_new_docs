---
title: Fetching wrappers (JS apps)
description: Getting started with the Polywrap client JavaScript library
---

This step-by-step guide shows you how to use the Polywrap client in **React.js** applications. The client enables your app to fetch any deployed wrapper.

{% callout title="Client libraries" %}
The client is available for JavaScript apps today with Rust and Python coming in the near future.
{% /callout %}

---

## Template application

The template application serves as an environment for learning how the Polywrap client works. To create a project, run:

```shell
npx polywrap create app typescript-react my-app
cd my-app && yarn
```

---

## Existing applications

To add the client into an existing React application, run:

```shell
npm install --save @polywrap/react
```

---

## Setting up the provider

`PolywrapProvider` wraps your React app, making the Polywrap client available to any nested components.

```jsx
// index.js

import React from 'react'
import { render } from 'react-dom'
import { PolywrapProvider } from '@polywrap/react'

function App() {
  return (
    <div>
      <h2>My Polywrap app!</h2>
    </div>
  )
}

render(
  <PolywrapProvider>
    <App />
  </PolywrapProvider>,
  document.getElementById('root')
)
```

---

## Configuring the provider

`PolywrapProvider` supports redirects to forward the client from one URI to another.

```jsx
...

const redirects = [
  {
    from: 'ens/wrapperv1.eth',
    to: 'ens/wrapperv2.eth'
  }
]

render(
  <PolywrapProvider redirects={redirects}>
    <App />
  </PolywrapProvider>,
  document.getElementById('root')
)
```

---

## Invoking a wrapper

After wrapping our React app with the provider, we can instantiate `usePolywrapInvoke` to fetch wrappers. `usePolywrapInvoke` also handles the request cycle from start to finish, including tracking loading and error states.

```jsx
import { usePolywrapInvoke } from '@polywrap/react'

const { execute, data, error, loading } = usePolywrapInvoke({
  uri: 'ens/api.helloworld.polywrap.eth',
  method: 'logMessage',
  input: {
    message: 'Hello World!',
  },
})
```

The client fetches the wrapper resolved from the given `uri`. The `method` indicates the function to be invoked on the wrapper and `input` is the arguments passed into the invoked function.
