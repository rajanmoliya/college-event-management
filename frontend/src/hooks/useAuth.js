// hooks/useAuth.js
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil/authState";
import { userState } from "../recoil/userState";
import fetchUser from "../api/fetchUser";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const setAuthState = useSetRecoilState(authState);
  const setUserState = useSetRecoilState(userState);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthState({ isAuthenticated: true, token });
        try {
          const user = await fetchUser();
          setUserState({ isAuthenticated: true, token, role: user.role });
        } catch (error) {
          console.error("Failed to fetch user:", error);
          // Handle error (e.g., clear token if it's invalid)
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [setAuthState, setUserState]);

  return { isLoading };
}
