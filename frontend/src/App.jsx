import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList role="Patient" />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/book" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
