import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Forgot from "./pages/Forgot";
import History from "./pages/History";
import Payment from "./pages/Payment";
import Detail from "./pages/Detail";
import NewProduct from "./pages/NewProduct";
import NewPromo from "./pages/NewPromo";
import EditPromo from "./pages/EditPromo";
import PrivateRoutes from "./Component/PrivateRoutes";
import BackRoutes from "./Component/BackRoutes";

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: (
      <BackRoutes>
        <Login />
      </BackRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <BackRoutes>
        <Register />
      </BackRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoutes allowedRoles={["user", "admin"]}>
        <Profile />
      </PrivateRoutes>
    ),
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/forgot-password",
    element: (
      <BackRoutes>
        <Forgot />
      </BackRoutes>
    ),
  },

  {
    path: "/history",
    element: (
      <PrivateRoutes allowedRoles={["user"]}>
        <History />
      </PrivateRoutes>
    ),
  },
  {
    path: "/detail-product/:id",
    element: (
      <PrivateRoutes allowedRoles={["user", "admin"]}>
        <Detail />
      </PrivateRoutes>
    ),
  },
  {
    path: "/cart",
    element: (
      <PrivateRoutes allowedRoles={["user"]}>
        <Payment />
      </PrivateRoutes>
    ),
  },
  {
    path: "/new-product",
    element: (
      <PrivateRoutes allowedRoles={["admin"]}>
        <NewProduct />
      </PrivateRoutes>
    ),
  },
  {
    path: "/new-promo",
    element: (
      <PrivateRoutes allowedRoles={["admin"]}>
        <NewPromo />
      </PrivateRoutes>
    ),
  },
  {
    path: "/edit-promo",
    element: (
      <PrivateRoutes allowedRoles={["admin"]}>
        <EditPromo />
      </PrivateRoutes>
    ),
  },
]);

export default router;
