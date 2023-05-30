import { createContext, useEffect, useState } from "react";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
import useToastService from "../hooks/useToastService";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { displayToast } = useToastService();

  useEffect(() => {
    localStorage.removeItem("currentPage");
    localStorage.removeItem("filteredPets");
    getUser();
  }, []);

  useEffect(() => {
    if (user && user?.isAdmin) {
      getAllUsers();
    }
  }, [user]);

  const handleAuthResponse = (res) => {
    localStorage.setItem("token", res.token);
    setUser({
      email: res.email,
      id: res.id,
      name: res.name,
      number: res.number,
      isAdmin: res.isAdmin,
    });
    displayToast("success", "Logged in successfully.");
    navigate(navigate.length > 2 ? -1 : "/");
  };

  const handleError = (error) => {
    console.log(error);
    displayToast("error", error.response.data.error);
  };

  const getUser = async () => {
    if (
      !localStorage.getItem("token") &&
      !localStorage.getItem("google_token")
    ) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await userService.get();
      if (res.isLoggedIn) {
        setUser({
          email: res.email,
          id: res.id,
          name: res.name,
          number: res.number,
          isAdmin: res.isAdmin,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    if (localStorage.getItem("google_token")) {
      googleLogout();
      localStorage.removeItem("google_token");
    }

    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }

    setUser(null);
    setIsLoggedIn(false);
    displayToast("success", "Logged out successfully.");
  };

  const handleAuthentication = async (data, action) => {
    try {
      setLoading(true);
      await action(data);
      const res = await userService.login(data);
      handleAuthResponse(res);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data) => {
    try {
      setLoading(true);
      await userService.update({
        ...data,
        email: user.email,
        id: user.id,
      });
      displayToast("success", "Profile updated successfully.");
      getUser();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    if (!user || !user?.isAdmin) return;

    try {
      const res = await userService.getAll();
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const response = await userService.googleLogin(res);
      localStorage.setItem("google_token", response.google_token);
      setUser({
        email: response.userExists.email,
        id: response.userExists.id,
        name: response.userExists.name,
        number: response.userExists.number,
        isAdmin: response.userExists.isAdmin,
      });
      displayToast("success", "Logged in successfully.");
      navigate(navigate.length > 2 ? -1 : "/");
    },
    onError: (err) => {
      displayToast("error", err);
      console.log(err);
    },
    onFailure: (res) => {
      displayToast("error", res);
      console.log(res);
    },
  });

  const values = {
    user,
    users,
    isLoggedIn,
    loading,
    getUser,
    signOut,
    signIn: (data) => handleAuthentication(data, userService.login),
    signUp: (data) => handleAuthentication(data, userService.create),
    updateUser,
    handleGoogleLogin,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
