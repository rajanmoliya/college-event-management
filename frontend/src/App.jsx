import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { LandingPage } from "./pages/LandingPage";
import { Events } from "./pages/Events";
import { MyRegistration } from "./pages/MyRegistration";
import { Calander } from "./pages/Calander";
import { Login } from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/events" element={<Events />} />
          <Route path="/my-registrations" element={<MyRegistration />} />
          <Route path="/calendar" element={<Calander />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
