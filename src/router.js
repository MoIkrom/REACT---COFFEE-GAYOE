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

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
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
  { path: "/forgot", element: <Forgot /> },

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
  { path: "/payment", element: <Payment /> },
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
