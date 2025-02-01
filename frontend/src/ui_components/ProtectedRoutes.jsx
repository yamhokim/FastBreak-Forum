import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";
import api from "@/api";

const ProtectedRoutes = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  useEffect(function () {
    authorize().catch(() => setIsAuthorized(false));
  }, []);

  async function refreshToken() {
    const refresh = localStorage.getItem("refresh");

    try {
      const response = await api.post("token_refresh", { refresh });
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.log(error);
    }
  }

  async function authorize() {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthorized(false);
      return;
    } else {
      const decodedToken = jwtDecode(token);
      const expiryDate = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      if (currentTime > expiryDate) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    }
  }

  if (isAuthorized === null) {
    return <Spinner />;
  }

  return (
    <>
      {isAuthorized ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoutes;
