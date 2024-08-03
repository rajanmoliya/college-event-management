import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authState";
import { LandingPage } from "../../components/LandingPage";
import AdminNavbar from "../../components/admin/AdminNavbar";

export const AdminEvents = () => {
  const auth = useRecoilValue(authState);

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }
  return (
    <>
      <AdminNavbar />
    </>
  );
};
