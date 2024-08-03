import Navbar from "../components/Navbar";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/authState";
import { LandingPage } from "../components/LandingPage";

export const Dashboard = () => {
  const auth = useRecoilValue(authState);

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold">SDJ EventHub</h1>
      </div>
    </>
  );
};
