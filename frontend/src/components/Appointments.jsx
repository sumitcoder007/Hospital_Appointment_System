import React, { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments");
      setAppointments(data);
    } catch (err) {
      toast.error("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      await API.put(`/appointments/${id}/cancel`);
      toast.success("Appointment Cancelled");
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel Failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border rounded-xl shadow-xl bg-gradient-to-r from-blue-50 via-white to-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">
            You don’t have any appointments yet.
          </h3>
          <p className="text-gray-600 mt-2 text-center max-w-xs">
            Book your first appointment with a doctor to get started.
          </p>
          <button
            onClick={() => navigate("/book")}
            className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            📅 Book Appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((a) => (
            <div
              key={a._id}
              className="p-5 rounded-xl shadow-lg bg-white hover:shadow-2xl transition relative flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Patient: <span className="font-normal">{a.patient.name}</span>
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Doctor: <span className="font-normal">{a.doctor.name}</span>
                </h3>
                <p className="text-gray-600 mb-2">
                  Date: {new Date(a.date).toLocaleString()}
                </p>
                <p
                  className={`font-semibold ${
                    a.status === "Booked" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Status: {a.status}
                </p>
              </div>

              {a.status === "Booked" && (
                <button
                  onClick={() => cancelAppointment(a._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium self-start"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
