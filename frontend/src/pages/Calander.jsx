import { useRecoilValue } from "recoil";
import Navbar from "../components/Navbar";
import { authState } from "../recoil/authState";
import { LandingPage } from "../components/LandingPage";

export const Calander = () => {
  const auth = useRecoilValue(authState);

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }
  return (
    <>
      <Navbar />
    </>
  );
};
