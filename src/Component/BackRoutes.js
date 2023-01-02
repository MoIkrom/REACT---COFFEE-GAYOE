import React from "react";
import { Navigate } from "react-router-dom";

class BackRoutes extends React.Component {
  render() {
    const { children, allowedRoles = [] } = this.props;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) return <Navigate to="/" replace={true} state={{ isRedirected: true }} />;
    if (allowedRoles.length > 0)
      if (!allowedRoles.includes(role))
        return (
          <Navigate
            to="/"
            replace={true}
            state={{
              isRedirected: true,
            }}
          />
        );
    return children;
  }
}

export default BackRoutes;
