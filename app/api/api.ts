import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const apiClient = axios.create({
  baseURL: `${baseURL}` || "http://localhost:4000",
});

const apiClientPrivate = axios.create({
  baseURL: `${baseURL}` || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
const queryClient = new QueryClient();

export { apiClient, queryClient, apiClientPrivate, baseURL };
