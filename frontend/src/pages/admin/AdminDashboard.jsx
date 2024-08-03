import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { LandingPage } from "../../components/LandingPage";
import fetchUser from "../../api/fetchUser";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authState";

export const AdminDashboard = () => {
  const [user, setUser] = useState({});

  const auth = useRecoilValue(authState);

  useEffect(() => {
    fetchUser().then((data) => setUser(data));
  }, []);

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <AdminNavbar />

      <div className="flex justify-center min-h-screen bg-gray-100 p-4">
        <div>{JSON.stringify(user)}</div>
      </div>
    </>
  );
};
