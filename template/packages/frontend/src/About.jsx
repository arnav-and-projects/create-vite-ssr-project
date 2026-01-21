import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>About Simple Monolith</h1>
            <p>This page is server-side rendered.</p>
            <p>
                We use Vite SSR to deliver pre-rendered HTML to bots and users alike,
                ensuring great performance and SEO.
            </p>
            <Link to="/">Go back Home</Link>
        </div>
    );
}
