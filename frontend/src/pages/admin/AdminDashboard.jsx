import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authState";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { LandingPage } from "../../components/LandingPage";
import StatCard from "../../components/admin/StatCard";
import EventCard from "../../components/admin/EventCard";
import { fetchDashboardData } from "../../api/fetchDashboardData";

export const AdminDashboard = () => {
  const auth = useRecoilValue(authState);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (auth.isAuthenticated) {
        try {
          const data = await fetchDashboardData();
          setDashboardData(data);
        } catch (err) {
          setError("Error fetching dashboard data");
          console.error("Error fetching dashboard data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadDashboardData();
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-4">
        {loading ? (
          <div className="container mx-auto text-2xl font-bold mb-8">
            Loading...
          </div>
        ) : (
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Users" count={dashboardData.userCount} />
              <StatCard title="Events" count={dashboardData.eventCount} />
              <StatCard
                title="Registrations"
                count={dashboardData.registrationCount}
              />
            </div>

            {/* All Events */}
            <h2 className="text-2xl font-semibold mb-4">All Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.allEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
