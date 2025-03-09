import { apiClient, queryClient } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import type { Prediction, PredictionRequest } from "~/types";
import { handleErrors } from "./utils";
import { useAuth } from "~/context/AuthContext";
import useAxiosPrivate from "~/hooks/useAxiosPrivate";

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  email: string;
  password: string;
  fullname: string;
}

interface DecodedToken {
  user: {
    user_id: string;
    email: string;
    fullname?: string;
  };
  exp: number;
}

interface AuthResponse {
  access_token: string;
  user: {
    user_id: string;
    email: string;
    name?: string;
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/classify";
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: (formData: LoginFormData) => {
      return apiClient.post<AuthResponse>("auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      const token = res.data.access_token;
      const decodedToken = jwtDecode<DecodedToken>(token);
      const user = decodedToken.user;
      console.log("User", user);
      console.log("Token", token);
      setAuth({ user, token });
      queryClient.invalidateQueries({ queryKey: ["userdata", user.user_id] });
      toast("Login Successful");
      navigate(from, { replace: true });
    },
    onError: (err) => {
      console.error(err);
      handleErrors(err.response?.data?.message || null);
    },
  });
}

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: SignupFormData) => {
      const response = await apiClient.post<{
        user: { email: string; user_id: string };
      }>(`auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (!data || !data.user.email) {
        console.error("Invalid data received:", data);
        throw new Error("Invalid response from server");
      }
      queryClient.invalidateQueries();
      toast("You have been successfully registered.");
      navigate("/login");
    },
    onError: (err) => {
      console.error(err);
      handleErrors(err.response?.data?.message || null);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const apiClientPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await apiClientPrivate.get("/auth/logout");
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      setAuth({});
      queryClient.invalidateQueries();
      navigate("/", { replace: true });
      localStorage.removeItem("authState");
    },
    onError: (err) => {
      console.error(err);
      handleErrors(err.response?.data?.message || null);
    },
  });
}

// Function to get recent predictions
export function useGetPredictions() {
  const apiClientPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["predictions"],
    queryFn: async () => {
      const response = await apiClientPrivate.get<Prediction[]>(
        "/predictions/predictions"
      );
      return response.data;
    },
    retry(failureCount, error) {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
  });
}

export function useSubmitPrediction() {
  const apiClientPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async (data: PredictionRequest) => {
      const formData = new FormData();
      // Make sure to use the field name that the API expects (file instead of image)
      formData.append("file", data.image);
      if (data.plant) {
        formData.append("plant", data.plant);
      }

      // Update the endpoint to match your API router
      const response = await apiClientPrivate.post<Prediction>(
        "/predictions/", // Make sure this matches your backend route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
      toast("Analysis completed successfully");
      return data;
    },
    onError: (err) => {
      console.error("Prediction submission error:", err);
      handleErrors(err.response?.data?.message || null);
    },
  });
}
// // Function to get a specific prediction by ID
// export function useGetPrediction(predictionId: string | null) {
//   const apiClientPrivate = useAxiosPrivate();
//
//   return useQuery({
//     queryKey: ["prediction", predictionId],
//     queryFn: async () => {
//       if (!predictionId) return null;
//       const response = await apiClientPrivate.get<Prediction>(
//         `/predictions/${predictionId}`
//       );
//       return response.data;
//     },
//     enabled: !!predictionId,
//     retry(failureCount, error) {
//       if (error.status === 404) return false;
//       return failureCount < 3;
//     },
//   });
// }
