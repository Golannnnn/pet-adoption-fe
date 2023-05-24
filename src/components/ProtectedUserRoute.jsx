import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedUserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/users/signin" />;
  return children;
};

export default ProtectedUserRoute;
