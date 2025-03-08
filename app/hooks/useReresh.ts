import { apiClient } from "~/api/api";
import { useAuth } from "~/context/AuthContext";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await apiClient.get("auth/refresh_token", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, token: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
