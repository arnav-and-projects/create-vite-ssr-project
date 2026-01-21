import React, { useEffect, useState, useContext } from "react";
import { SSRContext } from "./ssr-context";

function Home() {
  const { users } = useContext(SSRContext) || {};
  // Ensure context data contains users array.
  const initialData = Array.isArray(users) ? users : null;

  const [usersData, setUsers] = useState(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [initialData]);

  return (
    <>
      <div className="card-grid">
        <div className="card">
          <h3>⚡️ Blazing Fast</h3>
          <p>
            Serves static HTML to real users for instant page loads and zero
            server overhead.
          </p>
        </div>
        <div className="card">
          <h3>🤖 Bot Friendly</h3>
          <p>
            Detects crawlers and serves fully rendered HTML via Puppeteer for
            perfect SEO.
          </p>
        </div>
        <div className="card">
          <h3>📦 Monorepo Ready</h3>
          <p>
            Built on Turbopack with clear separation of concerns: Backend,
            Frontend, and SSR.
          </p>
        </div>
      </div>

      <section className="data-section">
        <h2>Users Data (SSR)</h2>
        <p className="subtitle">
          This section loads users from an external API.
          <br />
          If SSR is working, you will see this content in the page source!
        </p>

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="card-grid">
            {usersData.map((user) => (
              <div key={user.id} className="card">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Company: {user.company.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
