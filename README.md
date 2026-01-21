# Simple Monolith

Lightweight Fullstack Scaffold For Adding SSR To Your React Project. Built On Vite-SSR & TurboRepo

This architecture ensures:

1.  **Performance**: Powered by Vite and React.
2.  **SEO**: Full Server-Side Rendering (SSR)
3.  **Separation**: Distinct packages for Backend and Frontend.

## Getting Started

### Installation

1.  npx create-vite-ssr-project <project-name>
2.  cd <project-name>
3.  npm install

### Running Locally

To start the application (Frontend with SSR + Backend):

```bash
npm run dev
```

This will start:

- **Backend**: http://localhost:3001
- **Frontend (Vite SSR)**: http://localhost:3000

### Running Services Individually

You can also run specific parts of the stack:

- **`npm run backend-dev`**: Runs only the backend service.
- **`npm run frontend-dev`**: Runs the frontend with SSR.

## Using SSR Features

The framework uses a centralized routing configuration to handle Server-Side Rendering (SSR) data fetching.

### Defines Routes (`routes.jsx`)

You can define your application's routes in `packages/frontend/src/routes.jsx`. Each route object supports an `initialState` function for data fetching.

```javascript
// packages/frontend/src/routes.jsx
import Home from "./Home";

export default [
  {
    path: "/",
    component: Home,
    // async function to fetch data server-side
    initialState: async () => {
      const res = await fetch("https://api.example.com/data");
      const data = await res.json();
      // MUST return an object
      return { users: data };
    },
  },
  // ...
];
```

### Accessing Data in Components

The data returned by `initialState` is available in your components via the `SSRContext`.

```javascript
import React, { useContext } from "react";
import { SSRContext } from "./ssr-context";

export default function Home() {
  // Destructure the key you returned from initialState
  const { users } = useContext(SSRContext) || {};

  // Use the data (will be populated on server render)
  if (!users) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Deployment

When deploying `vite-ssr-project`, you need to host:

- **Backend**: Run the `npm run backend-start` script.
- **Frontend**: Run the `npm run frontend-start` script.

## Building for Production

```bash
npm run build
```

This triggers `turbo run build`, which builds the React app into `packages/frontend/dist`.

## Onboarding

To scaffold a new project based on this template, you can run:

```bash
npx create-vite-ssr-project <project-name>
```

_(Note: Since this is a specialized repo, simply cloning this structure works effectively as a starting point)._
