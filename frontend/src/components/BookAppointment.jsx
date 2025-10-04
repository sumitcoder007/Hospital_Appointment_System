import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor: "", date: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Add useNavigate

  // Set token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      return;
    }
    setAuthToken(token);

    const fetchDoctors = async () => {
      try {
        const { data } = await API.get("/users?role=Doctor");
        setDoctors(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctor || !form.date) {
      toast.error("Please select a doctor and date");
      return;
    }

    setLoading(true);
    try {
      await API.post("/appointments", form);
      toast.success("Appointment Booked Successfully");

      // ✅ Redirect to appointments page
      navigate("/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Book Appointment
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold p-3 rounded-xl hover:scale-105 transform transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
