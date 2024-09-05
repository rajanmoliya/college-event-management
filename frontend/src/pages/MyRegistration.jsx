import { useRecoilValue } from "recoil";
import Navbar from "../components/Navbar";
import { authState } from "../recoil/authState";
import { LandingPage } from "../components/LandingPage";
import { Registrations } from "../components/Registrations";

export const MyRegistration = () => {
  const auth = useRecoilValue(authState);

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 ">
        <Registrations />
      </div>
    </>
  );
};
