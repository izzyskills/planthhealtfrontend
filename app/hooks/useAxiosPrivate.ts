import { useEffect } from "react";
import { useAuth } from "~/context/AuthContext";
import { apiClientPrivate } from "~/api/api";
import useRefreshToken from "./useReresh";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { authState, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiClientPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authState?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiClientPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            if (!newAccessToken) {
              // If new access token is not obtained, clear auth state
              console.log(authState);
              setAuth({});
              return Promise.reject(error); // Stop retrying the request
            }
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return apiClientPrivate(prevRequest); // Retry the request with new access token
          } catch (refreshError) {
            // console.error("Error refreshing access token:", refreshError);
            setAuth({});
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      apiClientPrivate.interceptors.request.eject(requestIntercept);
      apiClientPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authState, refresh, setAuth]);

  return apiClientPrivate;
};

export default useAxiosPrivate;
