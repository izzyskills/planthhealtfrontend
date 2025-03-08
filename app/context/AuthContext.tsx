import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import type { AuthState, AuthProviderProps, AuthContextType } from "~/types";

// Create context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the AuthProvider

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize auth state from localStorage with proper type checking
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const storedAuth = localStorage.getItem("authState");
      return storedAuth ? JSON.parse(storedAuth) : {};
    } catch (error) {
      console.error("Failed to parse auth state from localStorage:", error);
      return {};
    }
  });

  // Update localStorage when authState changes
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  // Set auth state with type safety
  const setAuth = useCallback((auth: AuthState) => {
    setAuthState(auth);
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      // Replace with your actual logout API call
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear auth state after successful logout
      setAuthState({});
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, []);

  // Computed values with type safety
  const isLoggedIn = !!authState.user?.user_uid;
  const user = authState.user || null;

  // Create the context value object with the correct type
  const value: AuthContextType = {
    authState,
    setAuth,
    isLoggedIn,
    user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context with type checking
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  console.log("context", context);
  return context;
};

export default AuthContext;
