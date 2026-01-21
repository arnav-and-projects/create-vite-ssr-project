import Home from "./Home";
import Post from "./Post";

export default [
    {
        path: "*",
        component: Home,
        initialState: () => {
            return fetch("https://jsonplaceholder.typicode.com/users")
                .then((res) => res.json())
                .then(data => ({ users: data }));
        },
    },
    {
        path: "/",
        component: Home,
        initialState: () => {
            return fetch("https://jsonplaceholder.typicode.com/users")
                .then((res) => res.json())
                .then(data => ({ users: data }));
        },
    },
    {
        path: "/index.html",
        component: Home,
        initialState: () => {
            return fetch("https://jsonplaceholder.typicode.com/users")
                .then((res) => res.json())
                .then(data => ({ users: data }));
        },
    },
    {
        path: "/post/:id",
        component: Post,
        initialState: ({ params }) => {
            return fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
                .then((res) => res.json())
                .then(data => ({ post: data }));
        },
    },
];
