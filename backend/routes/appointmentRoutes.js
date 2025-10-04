const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { bookAppointment, cancelAppointment, getAppointments } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/', protect, bookAppointment);
router.put('/:id/cancel', protect, cancelAppointment);
router.get('/', protect, getAppointments);

module.exports = router;
