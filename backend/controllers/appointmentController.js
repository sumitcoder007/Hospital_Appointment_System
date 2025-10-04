const Appointment = require('../models/Appointment');

// Book Appointment
exports.bookAppointment = async (req, res) => {
  const patient = req.user._id; // use logged-in user
  const { doctor, date } = req.body;

  if (!doctor || !date) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const appointment = await Appointment.create({ patient, doctor, date });
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while booking appointment" });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Only patient who booked or doctor can cancel
    if (!appointment.patient.equals(req.user._id) && !appointment.doctor.equals(req.user._id)) {
      return res.status(403).json({ message: "You can't cancel this appointment" });
    }

    appointment.status = 'Cancelled';
    await appointment.save();
    res.json({ message: 'Appointment cancelled', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while cancelling appointment" });
  }
};

// Get All Appointments (for admin/doctor/patient)
exports.getAppointments = async (req, res) => {
  try {
    const filter = {};

    // If patient, show only their appointments
    if (req.user.role === "Patient") filter.patient = req.user._id;
    // If doctor, show only their appointments
    if (req.user.role === "Doctor") filter.doctor = req.user._id;

    const appointments = await Appointment.find(filter)
      .populate('patient', 'name username')
      .populate('doctor', 'name username');

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching appointments" });
  }
};
