import { useRoutes, Link } from "react-router-dom";
import { SSRContext } from "./ssr-context";
import routes from "./routes";

function App({ initialState, children }) {
  // Use useRoutes as a fallback or primary rendering mechanism.
  // If vite-ssr passes children, we can use it, but if it fails (undefined), useRoutes matches client-side/server-side manually.
  // Note: on key mismatch, children might be undefined.

  const element = useRoutes(
    routes.map((r) => ({
      ...r,
      element: <r.component />,
    })),
  );

  return (
    <SSRContext.Provider value={initialState}>
      <header>
        <h1>vite-ssr-project</h1>
        <p className="subtitle">
          A lightweight, bot-aware rendering framework. Static for users. SSR
          for bots.
        </p>
        <nav style={{ marginTop: "1rem" }}>
          <Link to="/" style={{ color: "white", marginRight: "1rem" }}>
            Home
          </Link>
          <Link to="/about" style={{ color: "white" }}>
            About
          </Link>
        </nav>
      </header>

      {children || element}
    </SSRContext.Provider>
  );
}

export default App;
