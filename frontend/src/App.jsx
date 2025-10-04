import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import BookAppointment from "./components/BookAppointment";
import Appointments from "./components/Appointments";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Default route points to Register */}
        <Route path="/" element={<Register />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList role="Patient" />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/book" element={<BookAppointment />} />

        {/* Optional: redirect unknown routes to Register */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
