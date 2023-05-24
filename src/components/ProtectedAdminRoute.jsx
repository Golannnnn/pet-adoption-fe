import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/" />;
  if (!user?.isAdmin) return <Navigate to="/" />;
  return children;
};

export default ProtectedAdminRoute;
