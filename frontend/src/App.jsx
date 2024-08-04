import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./components/AuthProvider";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { Events } from "./pages/Events";
import { MyRegistration } from "./pages/MyRegistration";
import { Calander } from "./pages/Calander";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { AdminEvents } from "./pages/admin/AdminEvents";
import EventRegistrations from "./components/admin/EventRegistrations";

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
            <Route path="/my-registrations" element={<MyRegistration />} />
            <Route path="/calendar" element={<Calander />} />
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route
                path="/admin/event-registrations/:eventId"
                element={<EventRegistrations />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
