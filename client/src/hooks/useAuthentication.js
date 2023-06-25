import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const useSetToken = () => {
  const { data, mutate } = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          mutate();
          const newAccessToken = data?.data?.accessToken;
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, mutate]);

  return axiosPrivate;
};
