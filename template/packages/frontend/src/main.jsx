import App from "./App.jsx";
import "./index.css";
import viteSSR from "vite-ssr/react";

import routes from "./routes";

import { matchRoutes } from 'react-router-dom'

export default viteSSR(App, { routes }, async (params) => {
    // Custom hook for hydration/data fetching
    const {
        app,
        router,
        isClient,
        initialState,
        initialRoute,
        request,
        redirect,
        writeHead,
    } = params;

    if (!isClient && !initialRoute) {
        const matches = matchRoutes(routes, request.originalUrl || request.url)
        if (matches && matches.length > 0) {
            const match = matches[matches.length - 1]
            if (match.route.initialState) {
                const data = await match.route.initialState({ params: match.params })
                Object.assign(initialState, data)
            }
        }
    }
});
