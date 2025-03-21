import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, perisistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import "./index.css";

import MainLayOut from "./layouts/MainLayout/MainLayout";
const ProfileLayout = lazy(
  () => import("./layouts/ProfileLayout/ProfileLayout")
);
const Home = lazy(() => import("./pages/Home"));
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
// const AboutUs = lazy(() => import("./pages/AboutUs"));
const Rigister = lazy(() => import("./pages/Rigister"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading..</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Suspense fallback={<div>Loading..</div>}>
              <Categories />
            </Suspense>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Products />
          </Suspense>
        ),
        loader: ({ params }) => {
          if (!/^[A-Z]+$/i.test(params.prefix as string)) {
            throw new Response("Bad Request", {
              statusText: "Category Not Found",
              status: 400,
            });
          }
          return true;
        },
      },
      // { path: "/aboutUs", element: <Suspense fallback={<div>Loading...</div>}><AboutUs /></Suspense> },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/rigister",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Rigister />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "orders",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Wishlist />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={perisistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
