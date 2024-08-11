import * as jwtDecode from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp > currentTime) {
      return true;
    } else {
      // Token has expired, remove it from local storage
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    // In case of an error (e.g., malformed token), remove it from local storage
    localStorage.removeItem("token");
    return false;
  }
};

export const getToken = () => localStorage.getItem("token");

export const logout = (setAuthState) => {
  localStorage.removeItem("token");
  setAuthState({ isAuthenticated: false, token: null });
};
