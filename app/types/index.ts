import type { ReactNode } from "react";

export interface Prediction {
  id: string;
  image: string;
  disease: string;
  confidence: number;
  date: string;
  plant: string;
  description: string;
  treatments: string[] | string;
}

export interface User {
  user_id: string;
  [key: string]: any; // Allow for additional user properties
}

export interface AuthState {
  user?: User;
  [key: string]: any; // Allow for additional auth state properties
}

export interface AuthProviderProps {
  children: ReactNode;
}
export interface AuthContextType {
  authState: AuthState;
  setAuth: (auth: AuthState) => void;
  isLoggedIn: boolean;
  user: User | null;
  logout: () => Promise<void>;
}
// Function to submit a prediction request
export interface PredictionRequest {
  image: File;
  plant?: string;
}
