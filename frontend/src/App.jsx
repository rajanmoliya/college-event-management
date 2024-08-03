import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { Dashboard } from "./pages/Dashboard";
import { Events } from "./pages/Events";
import { MyRegistration } from "./pages/MyRegistration";
import { Calander } from "./pages/Calander";
import { Login } from "./components/Login";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/events" element={<Events />} />
            <Route path="/my-registrations" element={<MyRegistration />} />
            <Route path="/calendar" element={<Calander />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
