import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

// 1. Setup paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Import the renderer
// Note: We import from 'main.js' inside dist/server.
// In your example it was require(`${dist}/server`), which implies an index.js or package.json main.
// If this fails, check if your file is named 'index.js' or 'main.js' inside dist/server.
import serverEntry from "./dist/server/main.js";
const renderPage = serverEntry.default || serverEntry;

// 3. Load Manifest
const manifestPath = path.join(__dirname, "dist/client/ssr-manifest.json");
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
  : {};

const server = express();
const port = process.env.PORT || 3000;

// 4. Serve Static Assets
// Your example used specific assets from package.json, but serving the whole client folder is safer/easier.
server.use(
  express.static(path.join(__dirname, "dist/client"), {
    index: false, // We must disable index.html so SSR handles the root route
  })
);

// 5. SSR Handler
server.get("*", async (request, response) => {
  try {
    // A. Reconstruct the full URL (Protocol + Host + Path)
    const url = `${request.protocol}://${request.get("host")}${request.originalUrl}`;

    // B. Call the renderer with the correct signature: (url, options)
    const { html, status, statusText, headers } = await renderPage(url, {
      manifest,
      preload: true,
      request, // passing the request object (req)
      response, // passing the response object (res)
      // initialState: { ... } // optional
    });

    // C. Send the response similar to your example
    response.type("html");
    response.writeHead(status || 200, statusText || headers, headers);
    response.end(html);
  } catch (error) {
    console.error("SSR Error:", error);
    response.status(500).end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`);
});
