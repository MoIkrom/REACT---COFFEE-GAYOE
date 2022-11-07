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

const router = createBrowserRouter([
  // { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/product", element: <Product /> },
  { path: "/profile", element: <Profile /> },
  { path: "/forgot", element: <Forgot /> },
  { path: "/history", element: <History /> },
  { path: "/detail", element: <Detail /> },
  { path: "/payment", element: <Payment /> },
  { path: "/newproduct", element: <NewProduct /> },
  { path: "/newpromo", element: <NewPromo /> },
  { path: "/editpromo", element: <EditPromo /> },
]);

export default router;
