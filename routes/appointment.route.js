const express = require('express');
const {  getAppointment, addAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointment.controller');
const appointmentRouter = express.Router();

// --------->>>> GET <<<<<---------
appointmentRouter.get('/', getAppointment);

// --------->>>> POST <<<<<---------
appointmentRouter.post('/add', addAppointment);

// --------->>>> PATCH <<<<<---------
appointmentRouter.patch('/update/:id', updateAppointment);

// --------->>>> DELETE <<<<<---------
appointmentRouter.delete('/delete/:id', deleteAppointment);


module.exports = { appointmentRouter };