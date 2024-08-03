import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    isAuthenticated: false,
    token: null,
    role: null, // Add role here
  },
});
