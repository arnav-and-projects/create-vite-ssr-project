import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SSRContext } from "./ssr-context";

export default function Post() {
    const { id } = useParams();
    // Destructure post from context (which is now an object like { post: {...} })
    const { post } = useContext(SSRContext) || {};
    const initialData = post;

    const [item, setItem] = useState(initialData);
    const [loading, setLoading] = useState(!initialData);

    // Note: Client-side fetching logic needs to be uncommented and adjusted if we want client-side hydration for direct navigation without SSR data, but for now focusing on SSR.

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-container" style={{ padding: "2rem" }}>
            {item && (
                <div>
                    <h1>{item.title}</h1>
                    <p>{item.body}</p>
                </div>
            )}

            <br />

            <Link to="/" style={{ color: "white" }}>
                Back to Home
            </Link>
        </div>
    );
}
