import React from "react";
import { Navigate } from "react-router-dom";

class PrivateRoutes extends React.Component {
  render() {
    const { children, allowedRoles = [] } = this.props;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return <Navigate to="/" replace={true} state={{ msg: "You have to Login first", isRedirected: true }} />;
    if (allowedRoles.length > 0)
      if (!allowedRoles.includes(role))
        return (
          <Navigate
            to="/"
            replace={true}
            state={{
              msg: "Forbidden",
              isRedirected: true,
            }}
          />
        );
    return children;
  }
}

export default PrivateRoutes;
