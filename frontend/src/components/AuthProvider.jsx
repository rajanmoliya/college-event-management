// components/AuthProvider.js
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line
export function AuthProvider({ children }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return children;
}
