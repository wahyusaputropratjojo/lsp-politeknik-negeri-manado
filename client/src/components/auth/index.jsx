// Packages
import { useContext, useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import decodeJWT from "jwt-decode";
import Cookies from "js-cookie";

// Utils
import axios from "../../utils/axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Components
import { Progress } from "../ui/progress";

// Assets
import LSP from "../../assets/logo/components/LSP";
import { is } from "date-fns/locale";

export const Authentication = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const accessToken = auth?.access_token;

  if (!!accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/masuk" state={{ from: location }} replace />;
  }
};

export const Authorization = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const role = auth?.role;

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export const RefreshAuthentication = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = Cookies.get("IS_LOGGED_IN") === "true";

  useQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      return await axios.get("/auth/token/access/refresh");
    },
    onSuccess: (data) => {
      const verify = () => {
        const { access_token } = data?.data?.data;
        const { id, nama_lengkap, email, role } = decodeJWT(access_token);
        setAuth({ id, nama_lengkap, email, role, access_token });
      };
      !auth?.access_token && verify();
    },
    retry: false,
    refetchOnReconnect: "always",
    enabled: !!isLoggedIn,
  });

  setTimeout(() => setIsLoading(false), 1000);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <div className="flex flex-col gap-8">
          <LSP className="h-14" />
          <Progress value={progress} className="h-2 w-96 bg-secondary-100" />
        </div>
      </div>
    );
  } else {
    return <Outlet />;
  }
};
