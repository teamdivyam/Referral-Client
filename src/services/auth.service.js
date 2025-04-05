import api from "../config/axios";

const AuthService = {
  // Login user and receive JWT cookies
  login: async (email, password) => {
    return api.post("/auth/login", { email, password });
    // The server will set the cookies, we don't need to handle them here
  },

  // Register new user and receive JWT cookies
  register: async (email, password, confirmPassword) => {
    return api.post("/auth/register", {
      email,
      password,
      confirmPassword,
    });
    // The server will set the cookies, we don't need to handle them here
  },

  // Logout user (server will clear cookies)
  logout: async () => {
    return api.post("/auth/logout");
    // The server will clear the cookies
  },

  // Get current user data using the access token cookie
  getCurrentUser: async () => {
    return api.get("/user");
    // The browser will automatically send the cookie
  },

  // Refresh the access token using the refresh token
  refreshToken: async () => {
    return api.post("/refresh-token");
    // The server will set a new access token cookie
  },
};

export default AuthService;
