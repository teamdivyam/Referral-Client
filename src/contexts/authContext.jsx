import { useState, useEffect, createContext } from "react";
import axios from "axios";
import authService from "../services/auth.service";
import agentService from "../services/agent.service";

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  reFetchCurrentUser: async () => {},
  clearError: () => {},
  refreshAuth: async () => false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to refresh the access token using refresh token
  const refreshAuth = async () => {
    try {
      await authService.refreshToken();
      // The server should set the new access token as an HTTP-only cookie
      // We don't need to manually set it on the client
      return true;
    } catch (error) {
      console.log("Refresh Auth Error:", error);
      setUser(null);
      return false;
    }
  };

  // Set up axios interceptor to handle token refresh
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshed = await refreshAuth();
            if (refreshed) {
              return axios(originalRequest);
            } else {
              // If refresh failed, clear use state and redirect to login
              setUser(null);
            }
          } catch (error) {
            setUser(null);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptor on unmount
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);

        // Fetch user data
        const response = await agentService.getMe();

        setUser(response.data.user);
      } catch (err) {
        if (err.response.status === 401) {
          try {
            const refreshed = await refreshAuth();
            if (refreshed) {
              // If refresh succeeds, try getting the user again
              const response = await agentService.getMe();
              console.log("User:", response.data.user);
              setUser(response.data.user);

            }
          } catch (error) {
            console.log("Check Auth Status Error:", error);
            // If refresh fails, we leave the user as null
            setUser(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      // The server will set HTTP-only cookies for access and refresh tokens
      await authService.login(email, password);

      // After successful login, fetch user data
      const response = await agentService.getMe();
      setUser(response.data.user);

    } catch (error) {
      setError(
        error.response.data.error.message || "Login failed. Please try again."
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email,
    password,
    confirmPassword
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // The server will set HTTP-only cookies for access and refresh tokens
      await authService.register(
        email,
        password,
        confirmPassword
      );

      // After successful registration, fetch user data
      const response = await agentService.getMe();
      setUser(response.data.user);

    } catch (error) {
      setError(
        error.response.data.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Call logout API if needed
      await authService.logout();

      setUser(null);
    } catch (err) {
      console.log("Logout Error:", err);
      // Even if logout API fails, we still want to clear local state
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const reFetchCurrentUser = async () => {
    try {
      // After successful registration, fetch user data
      const response = await agentService.getMe();
      setUser(response.data.user);
    } catch (error) {
      console.log("Refetch Current User Error:", error);
      setUser(null);
    }
  }

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        register,
        reFetchCurrentUser,
        clearError,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
