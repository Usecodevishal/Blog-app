import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContainer, Login } from "./components/index.js";
import Home from "./pages/Home.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";


const router = createBrowserRouter([
 {
   path: '/',
  element: <App/>,
  children: [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: (
            <AuthContainer authentication={false}>
                <Login />
            </AuthContainer>
        ),
    },
    {
        path: "/signup",
        element: (
            <AuthContainer authentication={false}>
                <Signup />
            </AuthContainer>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthContainer authentication>
                {" "}
                <AllPosts />
            </AuthContainer>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthContainer authentication>
                {" "}
                <AddPost />
            </AuthContainer>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthContainer authentication>
                {" "}
                <EditPost />
            </AuthContainer>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
],
}

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
