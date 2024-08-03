import * as jwtDecode from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getToken = () => localStorage.getItem("token");

export const logout = (setAuthState) => {
  localStorage.removeItem("token");
  setAuthState({ isAuthenticated: false, token: null });
};
